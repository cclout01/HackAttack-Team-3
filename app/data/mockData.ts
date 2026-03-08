export type Urgency = "low" | "medium" | "high" | "critical";
export type TimeCommitment = "1-2 hours" | "Half day" | "Full day" | "Weekly" | "Ongoing";
export type PositionStatus = "open" | "filled" | "completed";

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo: string;
  city: string;
  state: string;
  website: string;
  category: string;
}

export interface Position {
  id: string;
  orgId: string;
  title: string;
  description: string;
  requirements: string;
  skills: string[];
  location: string;
  city: string;
  state: string;
  date: string;
  endDate?: string;
  month: string;
  timeCommitment: TimeCommitment;
  urgency: Urgency;
  category: string;
  spotsTotal: number;
  spotsAvailable: number;
  image: string;
  signedUpVolunteers: string[];
  confirmedCompletions: string[];
  status: PositionStatus;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  city: string;
  state: string;
  avatar: string;
  signedUpPositions: string[];
  completedPositions: string[];
}

export interface CompletionRecord {
  id: string;
  volunteerId: string;
  positionId: string;
  confirmedByOrg: boolean;
  completedAt: string;
  hoursServed: number;
  orgNote: string;
  confirmedAt: string;
}

export const MOCK_ORGS: Organization[] = [
  {
    id: "org-1",
    name: "Roots & Branches",
    description: "We connect communities with local environmental initiatives, from trail restoration to urban greening projects.",
    logo: "🌿",
    city: "Portland",
    state: "OR",
    website: "rootsandbranches.org",
    category: "Environment",
  },
  {
    id: "org-2",
    name: "Harvest Hope",
    description: "A regional food bank dedicated to ending hunger through community-driven food rescue and distribution.",
    logo: "🌾",
    city: "Austin",
    state: "TX",
    website: "harvesthope.org",
    category: "Food Security",
  },
  {
    id: "org-3",
    name: "Paws & Purpose",
    description: "Animal rescue and welfare organization giving second chances to animals in need across the Pacific Northwest.",
    logo: "🐾",
    city: "Seattle",
    state: "WA",
    website: "pawsandpurpose.org",
    category: "Animal Welfare",
  },
  {
    id: "org-4",
    name: "Bright Futures Academy",
    description: "Providing free tutoring, mentorship, and after-school programs to underserved youth.",
    logo: "📚",
    city: "Chicago",
    state: "IL",
    website: "brightfuturesacademy.org",
    category: "Education",
  },
  {
    id: "org-5",
    name: "Green Thumb Collective",
    description: "Urban community gardens bringing fresh produce and green spaces to city neighborhoods.",
    logo: "🌱",
    city: "Denver",
    state: "CO",
    website: "greenthumbcollective.org",
    category: "Community",
  },
];

export const MOCK_POSITIONS: Position[] = [
  {
    id: "pos-1",
    orgId: "org-1",
    title: "Forest Trail Restoration Crew",
    description: "Join us for a hands-on trail restoration day in the Columbia River Gorge. We'll be removing invasive species, reseeding native plants, and repairing erosion damage along 3 miles of beloved hiking trail. All tools and protective gear provided. Lunch included!",
    requirements: "Must be able to walk on uneven terrain. Wear sturdy closed-toe shoes. Ages 16+.",
    skills: ["Physical fitness", "Teamwork", "Outdoor experience (optional)"],
    location: "Columbia River Gorge National Scenic Area",
    city: "Portland",
    state: "OR",
    date: "2026-03-21",
    month: "March",
    timeCommitment: "Full day",
    urgency: "high",
    category: "Environment",
    spotsTotal: 25,
    spotsAvailable: 7,
    image: "https://images.unsplash.com/photo-1772423921198-61a1ccb4b696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwYXJrJTIwdHJhaWwlMjBjbGVhbnVwJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3MjkwNzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: ["vol-1", "vol-2"],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-2",
    orgId: "org-2",
    title: "Weekend Food Pantry Volunteer",
    description: "Help sort, pack, and distribute donated food at our central Austin pantry. Volunteers assist with intake of donated items, quality-checking, organizing shelves, and helping families select food items with dignity. This is a recurring opportunity every Saturday.",
    requirements: "Ability to stand for 4+ hours. Some lifting required (up to 25 lbs).",
    skills: ["Customer service", "Organization", "Compassion"],
    location: "Harvest Hope Distribution Center",
    city: "Austin",
    state: "TX",
    date: "2026-03-15",
    month: "March",
    timeCommitment: "Half day",
    urgency: "critical",
    category: "Food Security",
    spotsTotal: 15,
    spotsAvailable: 2,
    image: "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlciUyMGhlbHBpbmd8ZW58MXx8fHwxNzcyOTA3NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: ["vol-1"],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-3",
    orgId: "org-3",
    title: "Animal Shelter Dog Walker",
    description: "Our shelter dogs need daily exercise and socialization! Volunteers walk assigned dogs for 45-60 minutes, practice basic commands, and document behavioral notes. This is an ongoing commitment — we ask for at least one shift per week for a minimum of 4 weeks.",
    requirements: "Comfortable around dogs of all sizes. No experience needed — training provided.",
    skills: ["Animal handling", "Reliability", "Physical activity"],
    location: "Paws & Purpose Seattle Shelter",
    city: "Seattle",
    state: "WA",
    date: "2026-03-10",
    endDate: "2026-04-30",
    month: "March",
    timeCommitment: "Weekly",
    urgency: "medium",
    category: "Animal Welfare",
    spotsTotal: 20,
    spotsAvailable: 8,
    image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBzaGVsdGVyJTIwdm9sdW50ZWVyJTIwY2FyaW5nJTIwcGV0c3xlbnwxfHx8fDE3NzI5MDc0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: [],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-4",
    orgId: "org-4",
    title: "After-School Math Tutor",
    description: "Provide one-on-one math tutoring to students in grades 6-10 at our Hyde Park learning center. Tutors help with homework, explain concepts, and build confidence. We match tutors with students based on skill level. Training and curriculum materials provided.",
    requirements: "Strong math skills through Algebra II. Background check required.",
    skills: ["Mathematics", "Patience", "Communication", "Teaching"],
    location: "Bright Futures Hyde Park Center",
    city: "Chicago",
    state: "IL",
    date: "2026-03-17",
    endDate: "2026-06-15",
    month: "March",
    timeCommitment: "Weekly",
    urgency: "high",
    category: "Education",
    spotsTotal: 12,
    spotsAvailable: 4,
    image: "https://images.unsplash.com/photo-1623287073837-5b07d79739a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmluZyUyMGNoaWxkcmVuJTIwZWR1Y2F0aW9uJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3MjkwNzQ0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: ["vol-2"],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-5",
    orgId: "org-5",
    title: "Spring Garden Planting Day",
    description: "Kick off the growing season with us! We'll be prepping beds, starting seedlings, and planting spring vegetables at our Cheesman Park community garden. All experience levels welcome — our experienced gardeners will guide newcomers. Produce shared with local food pantries.",
    requirements: "Dress for outdoor work. Bring gardening gloves if you have them.",
    skills: ["Gardening (optional)", "Physical activity", "Teamwork"],
    location: "Cheesman Park Community Garden",
    city: "Denver",
    state: "CO",
    date: "2026-04-05",
    month: "April",
    timeCommitment: "Half day",
    urgency: "medium",
    category: "Community",
    spotsTotal: 30,
    spotsAvailable: 18,
    image: "https://images.unsplash.com/photo-1770914755925-6468b9050176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjBwbGFudGluZyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzcyOTA3NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: [],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-6",
    orgId: "org-1",
    title: "Urban Tree Planting Brigade",
    description: "Help us plant 200 native trees across Portland neighborhoods to combat urban heat islands and improve air quality. Teams of 5 will rotate between dig, plant, and water stations. This is a high-impact event — your trees will grow for generations!",
    requirements: "Ability to dig. Bring water and snacks. Ages 14+ (under 18 needs adult).",
    skills: ["Physical fitness", "Environmental interest"],
    location: "Multiple Portland Neighborhoods",
    city: "Portland",
    state: "OR",
    date: "2026-04-22",
    month: "April",
    timeCommitment: "Full day",
    urgency: "medium",
    category: "Environment",
    spotsTotal: 50,
    spotsAvailable: 22,
    image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJpbmclMjBvdXRkb29yJTIwZ3JvdXB8ZW58MXx8fHwxNzcyOTA3NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: [],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-7",
    orgId: "org-2",
    title: "Mobile Food Pantry Driver Assistant",
    description: "Ride along on our mobile food pantry truck and help distribute fresh produce and shelf-stable items to underserved neighborhoods. Duties include loading/unloading boxes, greeting community members, and recording distribution data.",
    requirements: "Valid ID required. Must be 18+. Comfortable in fast-paced environment.",
    skills: ["Driving knowledge (optional)", "Lifting 30+ lbs", "Data entry"],
    location: "East Austin Mobile Route",
    city: "Austin",
    state: "TX",
    date: "2026-05-03",
    month: "May",
    timeCommitment: "Half day",
    urgency: "high",
    category: "Food Security",
    spotsTotal: 8,
    spotsAvailable: 3,
    image: "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlciUyMGhlbHBpbmd8ZW58MXx8fHwxNzcyOTA3NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: [],
    confirmedCompletions: [],
    status: "open",
  },
  {
    id: "pos-8",
    orgId: "org-4",
    title: "Summer Reading Program Storyteller",
    description: "Bring books to life for young readers! Lead engaging story-time sessions for children ages 4-8 at our Pilsen branch. Sessions are 45 minutes and include reading, discussion, and a craft activity. Materials provided.",
    requirements: "Enthusiasm and love of reading. Some experience with children preferred.",
    skills: ["Public speaking", "Creativity", "Storytelling", "Child care"],
    location: "Bright Futures Pilsen Branch",
    city: "Chicago",
    state: "IL",
    date: "2026-06-07",
    endDate: "2026-08-16",
    month: "June",
    timeCommitment: "Weekly",
    urgency: "low",
    category: "Education",
    spotsTotal: 6,
    spotsAvailable: 6,
    image: "https://images.unsplash.com/photo-1623287073837-5b07d79739a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmluZyUyMGNoaWxkcmVuJTIwZWR1Y2F0aW9uJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3MjkwNzQ0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: [],
    confirmedCompletions: [],
    status: "open",
  },
  // Past positions for completion demo
  {
    id: "pos-9",
    orgId: "org-1",
    title: "Winter Trail Cleanup",
    description: "Removed fallen debris and cleared drainage channels along the Wildwood Trail system after winter storms.",
    requirements: "",
    skills: ["Physical fitness"],
    location: "Forest Park",
    city: "Portland",
    state: "OR",
    date: "2026-01-18",
    month: "January",
    timeCommitment: "Full day",
    urgency: "high",
    category: "Environment",
    spotsTotal: 20,
    spotsAvailable: 0,
    image: "https://images.unsplash.com/photo-1772423921198-61a1ccb4b696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwYXJrJTIwdHJhaWwlMjBjbGVhbnVwJTIwdm9sdW50ZWVyfGVufDF8fHx8MTc3MjkwNzQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: ["vol-1"],
    confirmedCompletions: ["vol-1"],
    status: "completed",
  },
  {
    id: "pos-10",
    orgId: "org-2",
    title: "Holiday Food Drive Distribution",
    description: "Assisted families during the annual holiday food drive, sorting and distributing over 3,000 food boxes to Austin families in need.",
    requirements: "",
    skills: ["Customer service"],
    location: "Harvest Hope Distribution Center",
    city: "Austin",
    state: "TX",
    date: "2026-02-10",
    month: "February",
    timeCommitment: "Half day",
    urgency: "critical",
    category: "Food Security",
    spotsTotal: 30,
    spotsAvailable: 0,
    image: "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlciUyMGhlbHBpbmd8ZW58MXx8fHwxNzcyOTA3NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    signedUpVolunteers: ["vol-1"],
    confirmedCompletions: ["vol-1"],
    status: "completed",
  },
];

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: "vol-1",
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    bio: "Passionate about environmental causes and community food security. Looking to give back on weekends.",
    skills: ["Gardening", "Teaching", "Physical labor"],
    city: "Portland",
    state: "OR",
    avatar: "AR",
    signedUpPositions: ["pos-1", "pos-2"],
    completedPositions: ["pos-9", "pos-10"],
  },
  {
    id: "vol-2",
    name: "Sam Chen",
    email: "sam.chen@email.com",
    bio: "Educator and animal lover looking to support youth and local shelters.",
    skills: ["Math", "Science", "Animal handling"],
    city: "Chicago",
    state: "IL",
    avatar: "SC",
    signedUpPositions: ["pos-4"],
    completedPositions: [],
  },
];

export const MOCK_COMPLETIONS: CompletionRecord[] = [
  {
    id: "comp-1",
    volunteerId: "vol-1",
    positionId: "pos-9",
    confirmedByOrg: true,
    completedAt: "2026-01-18",
    hoursServed: 8,
    orgNote: "Alex was an outstanding volunteer — showed incredible work ethic and helped mentor newer volunteers on the trail. Their contribution helped us restore 1.2 miles of damaged trail infrastructure.",
    confirmedAt: "2026-01-20",
  },
  {
    id: "comp-2",
    volunteerId: "vol-1",
    positionId: "pos-10",
    confirmedByOrg: true,
    completedAt: "2026-02-10",
    hoursServed: 5,
    orgNote: "Alex was warm, efficient, and helped ensure over 200 families received their food boxes with dignity and care. A true community champion.",
    confirmedAt: "2026-02-12",
  },
];
