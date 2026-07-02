export type BookCategory = 'fiction' | 'memoir' | 'children';

export interface Book {
  slug: string;
  title: string;
  category: BookCategory;
  blurb: string;
  description: string;
  cover: string;
  /** Intrinsic pixel size of the cover file — keeps layout stable while it loads. */
  coverWidth: number;
  coverHeight: number;
  amazonUrl: string;
  featured?: boolean;
}

export const categoryOrder: BookCategory[] = ['fiction', 'memoir', 'children'];
export const categoryLabels: Record<BookCategory, string> = {
  fiction: 'Fiction',
  memoir: 'Memoirs',
  children: 'Young Readers',
};
// Singular form, used as the kicker on each book's page.
export const categoryKickers: Record<BookCategory, string> = {
  fiction: 'A Novel',
  memoir: 'A Memoir',
  children: 'For Young Readers',
};

export const books: Book[] = [
  {
    slug: 'our-own-authors',
    title: 'Our Own Authors',
    category: 'fiction',
    blurb:
      "A film location scout searches for the true meaning of human agency amid the world's most sought-after locales.",
    description:
      "Josh is a location scout for a major film production. His work takes him to some of the world's most sought-after locales, from street cafes in Istanbul to the Painted Ladies of San Francisco. While working through the script for his latest assignment, Josh grapples with his life trajectory—his professional aspirations, the family he leaves behind to do his work—and what his role actually is in determining it. Join a dynamic cast of film makers, A-list actors, and locals in this engaging tale of one man's search for the true meaning of human agency.",
    cover: '/images/covers/our-own-authors.jpg',
    coverWidth: 800,
    coverHeight: 1200,
    amazonUrl: 'https://www.amazon.com/dp/B0DNMVK13L',
    featured: true,
  },
  {
    slug: 'lifes-fingerprints',
    title: "Life's Fingerprints",
    category: 'fiction',
    blurb:
      'A restless Pennsylvania senior weighs college, love, and leaving Steel City behind in his final year of high school.',
    description:
      "Pennsylvania steel hangs heavy in the summer air as Dave, seventeen and restless about his future, sweats through another day on the construction site. Decisions about college, his relationships, and the right way forward loom. His senior days pulse with the thrum of Friday night lights, the roar of student-filled bleachers a marked counterpoint to the quiet ache of choosing a future. Between the uncertainty of what lies ahead and the trusting camaraderie of his friends, Dave wrestles with the bittersweet truth that leaving Steel City might mean leaving a part of himself—and his family—behind. In Life's Fingerprints, we join a young man on the ambiguous, often awkward final year of high school—an endearing walk along the streets of our childhood, colored with hope, nostalgia, and the strain that comes with leaving the nest for good.",
    cover: '/images/covers/lifes-fingerprints.jpg',
    coverWidth: 800,
    coverHeight: 1200,
    amazonUrl: 'https://www.amazon.com/Lifes-Fingerprints-Brian-Baleno/dp/B0CWGMTFW2',
  },
  {
    slug: 'adjacent-others',
    title: 'Adjacent Others',
    category: 'fiction',
    blurb:
      "A string of life's ups and downs teaches Mike that the world, and the people going through it with him, is smaller than it seems.",
    description:
      "The world is much smaller than it seems. At least that's how Mike comes to see it after a series of life's ups and downs remind him that there's people out there going through it all too—the good and the bad. A lot of people, some of whom we encounter when we least expect it. Sometimes, they've been with us all along.",
    cover: '/images/covers/adjacent-others.jpg',
    coverWidth: 800,
    coverHeight: 1219,
    amazonUrl: 'https://www.amazon.com/Adjacent-Others-Brian-Baleno/dp/B0BXNFVS3D',
  },
  {
    slug: 'insignificant-ones',
    title: 'Insignificant Ones',
    category: 'fiction',
    blurb:
      "A dream job with the Atlanta Braves collides with his girlfriend's legal trouble in this winding journey through today and yesterday.",
    description:
      "Matty thinks he's found his life's idyll. A dream job as beat writer for the Atlanta Braves. An intelligent and beautiful girlfriend. But his life takes an unexpected turn when Lana gets tied up in serious legal trouble at her firm. What follows is a winding journey—sometimes challenging, sometimes wonderful—through the trials of today, as well as all of the memories, love, and nostalgia that came before.",
    cover: '/images/covers/insignificant-ones.jpg',
    coverWidth: 314,
    coverHeight: 500,
    amazonUrl: 'https://www.amazon.com/dp/B099TSBXYQ',
  },
  {
    slug: 'plus-one',
    title: '+One',
    category: 'fiction',
    blurb:
      "A man caught between the woman he loves and the work he loves navigates a road not meant only for couples.",
    description:
      "In + One, Brian Baleno has rendered in vivid contours and colors the age-old human struggle between love and work, a conflict made all the more acute when one happens to love one’s work, as well as one’s romantic partner. Jake, our protagonist, finds himself wedged into an impossible predicament, and what endures most within the reader—besides the sheer, smooth skill of the language—is this man’s valiant attempt to navigate between the Scylla and Charybdis of his existence. This novel will stand as an emblem for all those whose life course takes them down the road less traveled, a road not meant only for couples.",
    cover: '/images/covers/plus-one.jpg',
    coverWidth: 328,
    coverHeight: 499,
    amazonUrl: 'https://www.amazon.com/One-Brian-Baleno/dp/061552432X',
  },
  {
    slug: 'route-66-with-grandpap',
    title: 'Route 66 with Grandpap',
    category: 'memoir',
    blurb: 'A cross-country road trip and the bond of generations.',
    description:
      "It begins as a college student's idea for a cross-country road trip. Young Stephen is an engineering student at Pitt with his entire life ahead of him—and lots of unanswered questions. As students do, he plans to make a circuitous driving tour of the U.S.—a once-in-a-lifetime adventure across all the must-see landmarks. But Steve's trip is a little different. Despite his doubts that his little old Chevy Cavalier can hold up against his ambitious itinerary and shoestring budget, he's thrilled to learn that his Grandma's months-long lobbying campaign has landed him the ultimate driving companion. What follows is an imaginative tale that explores the deep familial bond between grandparents and their progeny. It's a story full of timeless lessons earned through hard work, sacrifice, and discipline. By the end, you'll feel like you were sitting in the backseat of Steve's Cavalier, listening to he and Grandpap's colloquys out on the open road.",
    cover: '/images/covers/route-66-with-grandpap.jpg',
    coverWidth: 800,
    coverHeight: 1280,
    amazonUrl: 'https://www.amazon.com/Route-66-Grandpap-Brian-Baleno/dp/B0BD2CQKZY',
  },
  {
    slug: 'moms-enduring-faith-love',
    title: "Mom's Enduring Faith & Love",
    category: 'memoir',
    blurb:
      'A mother of seven from the Pittsburgh suburbs, and a life led staunchly in devotion to Christ.',
    description:
      "To say Robin Baleno has lived a full life is an understatement. A mother of seven children who grew up in the humble, hardworking suburbs of Pittsburgh, Robin’s story is one of faith, family, and friendship. In this heartfelt memoir, we follow Robin’s journey from childhood to motherhood—through triumphs, trials, and tribulations. We learn valuable lessons about keeping perspective and living with love. We trace back to the generations before. Above all, we bear witness to a life led staunchly in devotion to Christ.",
    cover: '/images/covers/moms-enduring-faith-love.jpg',
    coverWidth: 800,
    coverHeight: 1200,
    amazonUrl: 'https://www.amazon.com/Moms-Enduring-Faith-Brian-Baleno/dp/B09ZCKK4DX',
  },
  {
    slug: 'generational-lessons-from-dad',
    title: 'Generational Lessons from Dad',
    category: 'memoir',
    blurb:
      'From immigrant roots to a family built on hard work: the remarkable story of Tony Baleno and the generations around him.',
    description:
      "One cannot tell the story of Tony Baleno without a nod to the generations that preceded him and those that followed. In Generational Lessons from Dad, we're invited to explore all that has formed Tony Baleno the man, from the immigrant Italian family that brought the Baleno name to America, to the fathers and mothers, brothers and sisters, and eventually children and grandchildren that together help tell this man's remarkable story. Marked by hard work and an inimitable commitment to family—by both tremendous success and painful personal loss—Tony's is the story of a family built on values and ethic passed down through generations.",
    cover: '/images/covers/generational-lessons-from-dad.jpg',
    coverWidth: 333,
    coverHeight: 499,
    amazonUrl: 'https://www.amazon.com/Generational-Lessons-Dad-Brian-Baleno/dp/B08DSYRT5P',
  },
  {
    slug: 'fifty-halfs-from-first-to-last',
    title: 'Fifty Halfs from First to Last',
    category: 'memoir',
    blurb:
      'A three-year journey running a half marathon in every state, and a celebration of American landscapes.',
    description:
      "Take a journey with Brian Baleno as he runs a half marathon in every state. Experience an inside view of preparing, traveling, running, and recovering as this three year endeavor vividly recreates the imagery of the vast American landscape. This adventure is less of a story of personal accomplishment and more of a celebration of an often unseen American beauty; a story that encourages exploration, imagination, and self reflection.",
    cover: '/images/covers/fifty-halfs-from-first-to-last.jpg',
    coverWidth: 333,
    coverHeight: 499,
    amazonUrl: 'https://www.amazon.com/Halfs-First-Last-Brian-Baleno/dp/149528087X',
  },
  {
    slug: 'what-makes-cars-go-vroom',
    title: 'What Makes Cars Go Vroom?',
    category: 'children',
    blurb: "A learning adventure for kids into different types of cars and what makes them work.",
    description:
      "\"What Makes Cars Go Vroom?\" is a children's book. The story creates a learning environment for kids to discover different types of cars and what makes them work.",
    cover: '/images/covers/what-makes-cars-go-vroom.jpg',
    coverWidth: 218,
    coverHeight: 218,
    amazonUrl: 'https://www.amazon.com/What-Makes-Cars-Go-Vroom/dp/1976708885',
  },
];
