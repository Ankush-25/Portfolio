import React from 'react';
import { Hero } from '@/components/home/Hero';
import { StatsStrip } from '@/components/home/StatsStrip';
import { AboutIntro } from '@/components/home/AboutIntro';
import { DisciplineSelector } from '@/components/home/DisciplineSelector';
import { SelectedWork } from '@/components/home/SelectedWork';
import { HowIWork } from '@/components/home/HowIWork';
import { ImpactNumbers } from '@/components/home/ImpactNumbers';
import { StoryTimeline } from '@/components/home/StoryTimeline';
import { ContentHub } from '@/components/home/ContentHub';
import { Speaking } from '@/components/home/Speaking';
import { JourneyTimeline } from '@/components/home/JourneyTimeline';
import { Contact } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AboutIntro />
      <DisciplineSelector />
      <SelectedWork />
      <HowIWork />
      <ImpactNumbers />
      <StoryTimeline />
      <ContentHub />
      <Speaking />
      <JourneyTimeline />
      <Contact />
    </>
  );
}

