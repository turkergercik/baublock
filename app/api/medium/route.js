import { NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET(request) {
    
    const url = `https://medium.com/feed/@BlockchainIST`;
    try {
      const response = await fetch(url,{
        method:"GET",

      });
      const rssFeed = await response.text();
  
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(rssFeed);
  
      const articles = result.rss.channel[0].item.map(item => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        content: item['content:encoded'] ? item['content:encoded'][0] : '', // Full HTML content
      }));
     console.log(articles)
      //return articles;
      return NextResponse.json(articles)
    } catch (error) {
      console.error('Error fetching Medium articles:', error);
      return [];
    }
}