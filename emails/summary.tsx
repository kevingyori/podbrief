import {
  Body,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface Podcast {
  name?: string;
  title?: string;
  podcast_created_at?: string;
  audio_url?: string;
  image_url?: string;
  date_published?: string;
  summaryOverview?: string;
  actionableInsights?: string[];
  keyTakeaways?: string[];
  memorableQuotes?: string[];
}

interface PersonalPodcasterProps {
  podcasts: Podcast[];
}

const mockPodcast: Podcast = {
  name: 'The Huberman Lab',
  title: 'Adderall, Stimulants & Modafinil for ADHD: Short- & Long-Term Effects',
  audio_url: 'https://www.buzzsprout.com/275751/8957883-5am-miracle-episode-365.mp3',
  image_url: 'https://podsauce.com/wp-content/uploads/2021/07/HubermanLab-1024x1024.jpeg',
  date_published: '2021-08-01',
  summaryOverview: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
  actionableInsights: [
    'Actionable insight 1',
    'Actionable insight 2',
    'Actionable insight 3',
  ],
  keyTakeaways: [
    'Key takeaway 1',
    'Key takeaway 2',
    'Key takeaway 3',
  ],
  memorableQuotes: [
    'Memorable quote 1',
    'Memorable quote 2',
    'Memorable quote 3',
  ],
}

const mockPodcasts: Podcast[] = [
  mockPodcast,
  mockPodcast,
]

const PersonalPodcaster = ({ podcasts = mockPodcasts }) => {
  const url = 'https://podbrief.com';
  const siteName = 'Podbrief';

  return (
    <Html className='bg-[#1c202c]'>
      <Preview>Your Personal Podcaster</Preview>
      <Tailwind>
        <Body className="bg-[#1C202C] text-white my-auto mx-auto font-sans w-full max-w-xl px-8 pt-6">
          <Link href={url} className='text-2xl leading-4 text-white'>
            {siteName}
          </Link>
          {podcasts.map((podcast, index) => (
            <Section key={index} className=''>
              <Hr className="border border-solid border-[#F0BF6E] my-[26px] mx-0 w-full mt-4" />
              <Text className="text-xl font-bold mb-1">
                {podcast.name && podcast.name + ' - '}
                {podcast.title || 'No Title Provided'},
              </Text>
              <Text className=" mt-0">
                {podcast.date_published || 'No Publish Date Provided'}
              </Text>
              {podcast.audio_url
                ? <Link className='text-[#f0bf6e] decoration-[#f0bf6e] underline underline-offset-2' href={podcast.audio_url} >Listen to Podcast</Link>
                : 'No Audio URL Provided'
              }
              {/* {podcast.image_url */}
              {/*   ? <Img src={podcast.image_url} alt="Podcast Image" width={300} height={300} /> */}
              {/*   : 'No Image URL Provided' */}
              {/* } */}
              <Text className="text-xl font-semibold leading-7">
                Summary
              </Text>
              <Text className="leading-6">
                {podcast.summaryOverview || 'No Summary Overview Provided'}
              </Text>
              <Text className="text-xl font-semibold leading-7">
                Actionable Insights
              </Text>
              {podcast.actionableInsights && podcast.actionableInsights.length > 0 ? (
                <ul>
                  {podcast.actionableInsights.map((insight, i) => (
                    <li key={i}>
                      <Text className="leading-snug">
                        {insight}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text className="">
                  No Actionable Insights Provided
                </Text>
              )}
              <Text className="text-xl font-semibold leading-7">
                Key Takeaways
              </Text>
              {podcast.keyTakeaways && podcast.keyTakeaways.length > 0 ? (
                <ul>
                  {podcast.keyTakeaways.map((takeaway, i) => (
                    <li key={i}>
                      <Text className="leading-snug">
                        {takeaway}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text className="">
                  No Key Takeaways Provided
                </Text>
              )}
              <Text className="text-xl font-semibold leading-7">
                Memorable Quotes
              </Text>
              {podcast.memorableQuotes && podcast.memorableQuotes.length > 0 ? (
                <ul>
                  {podcast.memorableQuotes.map((quote, i) => (
                    <li key={i}>
                      <Text className="leading-snug">
                        {quote}
                      </Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text className="">
                  No Memorable Quotes Provided
                </Text>
              )}
            </Section>
          ))}

          {/* Footer */}
          <Section className="">
            <Hr className="border border-solid border-[#F0BF6E] w-full" />
            <Text className="text-muted-foreground mx-auto">
              This email was sent by <Link href={url} className='text-[#f0bf6e] underline underline-offset-2'>{siteName}</Link>
            </Text>
          </Section>

        </Body>
      </Tailwind>
    </Html>
  );
}

export default PersonalPodcaster;
