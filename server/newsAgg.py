# -*- coding: utf-8 -*-
"""
Created on Fri Apr 25 19:28:36 2014

@author: Caesarofthesky
"""
def init():
  #########################################
  # define our feeds
  #########################################
  feeds = [
    'http://feeds.feedburner.com/9To5Mac-MacAllDay',
    'http://feeds.feedburner.com/techdirt',
    'http://feeds.feedburner.com/TechCrunch',
    'http://feeds.feedburner.com/askTheAdmin',
    'http://feeds.feedburner.com/technobuffalo/rss',
    'http://www.engadget.com/rss-hd.xml',
    'http://www.daringfireball.net/feeds/main',
    'http://www.macworld.com/news/index.rss',
    'http://www.counternotions.com/feed/',
    'http://feeds.boingboing.net/boingboing/iBag',
    #'http://feeds.gawker.com/lifehacker/full',
    'http://www.gizmodo.com/rss',
    'http://www.recode.net/feed/',
    'http://feeds.mashable.com/Mashable',
    'http://www.nytimes.com/services/xml/rss/index.html',
    'http://feeds.wired.com/wired/index',
    'http://www.cnet.com/rss/news/',
    'http://feeds.arstechnica.com/arstechnica/index',
    'http://www.theverge.com/rss/index.xml'
  ]

  '''     
      'http://feeds2.feedburner.com/time/topstories',
      'http://rss.cnn.com/rss/cnn_topstories.rss',
      'http://www.huffingtonpost.com/feeds/index.xml',
      'http://news.google.com/?output=rss',
      'http://www.foxnews.com/about/rss/',
      'http://www.cbsnews.com/news/cbs-news-rss-feeds/',
      'http://www.reuters.com/tools/rss',
      'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      'http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
      'http://feeds.bbci.co.uk/news/rss.xml'
  '''

  #########################################
  # parse the feeds into a set of words per document
  #########################################
  import operator
  import feedparser
  import nltk
  import time
  import calendar
  import urllib2
  import lxml.html as imgGrabber
  import re
  #for enabling cookies on redirects
  from cookielib import CookieJar

  corpus = []
  titles=[]
  links = []
  dates = []
  epochTimes = []
  descriptions = []
  categories = []
  sources = []
  ct = -1
  epochTime = time.time()

  for feed in feeds:
      d = feedparser.parse(feed)
      for e in d['entries']:
         tupleTime = e['published_parsed']
         articleTime = calendar.timegm(tupleTime)
         timeDifference = (epochTime - articleTime)/(3600)
  #Only grabbing articles from the last ~ 24 hours
         if timeDifference < 24:
             words = nltk.wordpunct_tokenize(nltk.clean_html(e['description']))
             words.extend(nltk.wordpunct_tokenize(e['title']))
             lowerwords=[x.lower() for x in words if len(x) > 1]
             ct += 1
             corpus.append(lowerwords)
             titles.append(e['title'])
             links.append(e['link'])
             dates.append(e['published'])
             descriptions.append(e['description'])
             source = re.search("\.(.*?)\.", feed)
             sources.append(source.group(0)[1:-1])
  #Saving epoch times for server to reference when figuring out which feeds to pull out
             epochTimes.append(articleTime)

  #########################################
  # tf-idf implementation
  # from http://timtrueman.com/a-quick-foray-into-linear-algebra-and-python-tf-idf/
  #########################################
  import math
  from operator import itemgetter
  def freq(word, document): return document.count(word)
  def wordCount(document): return len(document)
  def numDocsContaining(word,documentList):
    count = 0
    for document in documentList:
      if freq(word,document) > 0:
        count += 1
    return count
  def tf(word, document): return (freq(word,document) / float(wordCount(document)))
  def idf(word, documentList): return math.log(len(documentList) / numDocsContaining(word,documentList))
  def tfidf(word, document, documentList): return (tf(word,document) * idf(word,documentList))

  #########################################
  # extract top keywords from each doc.
  # This defines features of our common feature vector
  #########################################
  def top_keywords(n,doc,corpus):
      d = {}
      for word in set(doc):
  #can optimize by checking whether the word exists in d already
          d[word] = tfidf(word,doc,corpus)
      sorted_d = sorted(d.iteritems(), key=operator.itemgetter(1))
      sorted_d.reverse()
      return [w[0] for w in sorted_d[:n]]   

  key_word_list=set()
  nkeywords=5
  [[key_word_list.add(x) for x in top_keywords(nkeywords,doc,corpus)] for doc in corpus]

  ct=-1
  for doc in corpus:
     ct+=1
     # print ct,"KEYWORDS"," ".join(top_keywords(nkeywords,doc,corpus))

  #########################################
  # turn each doc into a feature vector using TF-IDF score
  #########################################
  feature_vectors=[]
  n=len(corpus)

  for document in corpus:
      vec=[]
      [vec.append(tfidf(word, document, corpus) if word in document else 0) for word in key_word_list]
      feature_vectors.append(vec)

  #########################################
  # now turn that into symmatrix matrix of 
  # cosine similarities
  #########################################
  import numpy
  mat = numpy.empty((n, n))
  for i in xrange(0,n):
      for j in xrange(0,n):
         mat[i][j] = nltk.cluster.util.cosine_distance(feature_vectors[i],feature_vectors[j])

  #########################################
  # now hierarchically cluster mat
  #########################################
  from hcluster import linkage
  t = 0.8
  Z = linkage(mat, 'single')

  #########################################
  # extract our clusters
  #########################################
  def extract_clusters(Z,threshold,n):
     clusters={}
     ct=n
     for row in Z:
        if row[2] < threshold:
            n1=int(row[0])
            n2=int(row[1])

            if n1 >= n:
               l1=clusters[n1] 
               del(clusters[n1]) 
            else:
               l1= [n1]
        
            if n2 >= n:
               l2=clusters[n2] 
               del(clusters[n2]) 
            else:
               l2= [n2]    
            l1.extend(l2)  
            clusters[ct] = l1
            ct += 1
        else:
            return clusters

  clusters = extract_clusters(Z,t,n)
  print clusters
  #establishing our mongo database connection

  import pymongo
  from pymongo import MongoClient

  client = MongoClient('mongodb://sourcely:sourcely@oceanic.mongohq.com:10033/app25019458')
  clusterDatabase = client['app25019458']
  clusterCollection = clusterDatabase['clusterCollection']
  # clusterCollection.remove({}), drops all documents from collection

  if len(clusterCollection.distinct("collectionID")) == 0:
      collectionID = 0
  else:
      collectionID = sorted(clusterCollection.distinct("collectionID"))[-1] + 1

  print len(clusterCollection.distinct("title"))

  #inserting into mongo collection

  cj = CookieJar()
  opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

  for key in clusters:
     print "============================================="     
     collection = 0
  #Checking to see if an article exists in a current cluster, if it exists, set collection to that id 
     for id in clusters[key]:
         print id
         exists = clusterCollection.find_one({"title": titles[id]})       
         if exists != None:
             collection = exists["collectionID"]
             break
     for id in clusters[key]:
         print id
         exists = clusterCollection.find_one({"title": titles[id]})
         if exists == None:
             #image parsing
             # doc=imgGrabber.parse(opener.open(links[id]))
             # imgs=doc.xpath('//img/@src')
             # articleImages = []
             # print id,titles[id]
             if collection > 0:
                 article = {"collectionID": collection,
                   "title": titles[id],
                   "link": links[id],
                   "date": dates[id],
                   "category": "tech",
                   "description": descriptions[id],
                   "epochTime": epochTimes[id],
                   "source": sources[id]
                   }
                 print "old", article["collectionID"]
             else:
                 article = {"collectionID": collectionID,
                   "title": titles[id],
                   "link": links[id],
                   "date": dates[id],
                   "category": "tech",
                   "description": descriptions[id],
                   "epochTime": epochTimes[id],
                   "source": sources[id]
                   }
                 print "new", article["collectionID"]
             clusterCollection.insert(article)
     collectionID += 1