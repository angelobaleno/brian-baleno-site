# Asset-Upgrade List (hand to Brian if he approves the pitch)

- [ ] Hi-res book covers — current covers pulled from Wix are the original uploaded files (full-resolution
      `~mv2.jpg` originals, not the cropped thumbnail transforms shown on the old site), but several are
      still fairly small (e.g. `plus-one.jpg` is ~18KB, `what-makes-cars-go-vroom.jpg` is ~17KB). If Brian
      has the original print-ready cover art (from his publisher/KDP), swap those in for the small ones.
- [ ] Higher-quality author headshot — the only headshot on the live site is a small PNG (`Brian_edited.png`,
      ~249x329px) with a transparent background; it's been converted to `public/images/brian.jpg`. A larger,
      professionally shot headshot would look better in the new hero/about layout.
- [ ] Confirm which book is the featured "New Release" (currently: `our-own-authors` — it's the first book
      listed at the top of the live homepage, which is titled "Home | New Release").
- [ ] Real social profiles — the live site's footer Facebook/Twitter/LinkedIn icons all point to Wix's own
      default template accounts (facebook.com/wix, twitter.com/Wix, linkedin.com/company/wix-com), not Brian's
      accounts. These were dead links and have been removed (`site.socials` is empty). Brian's own bio text
      says "You can also find me on Facebook and Instagram" but no working profile URLs are published on the
      site — get his actual handles and add them to `src/data/site.ts`.
- [ ] Optional: refreshed / expanded bio copy. Two bios exist on the live site: a first-person "BIO" section
      on the homepage (used for `site.bio`) and a shorter third-person paragraph on `/about` describing his
      writing style ("personal," "thought provoking," "authentic"). Consider folding in the `/about` material
      too. Also note the homepage bio itself is stale — it says "This year I released my second fictional
      novel, Insignificant Ones," but three more novels (Our Own Authors, Life's Fingerprints, Adjacent
      Others) and several more books have been published since. Worth a fresh update from Brian.
- [ ] Verify total book count and that every title/description/Amazon link is current. 10 books were found
      on the live site (matches the brief's ~11 estimate closely — no additional undiscovered titles turned
      up after checking /work, /press, /about, /contact, and the sitemap).
- [ ] **Category judgment call — please confirm with Brian.** The task brief's prior-analysis notes listed
      "Life's Fingerprints" and "Adjacent Others" as memoir/non-fiction. After reading the FULL verbatim
      descriptions from the live site (via direct page-text extraction, not a summary), both are clearly
      fictional narratives with invented protagonists ("Dave," "Mike") — no real family names or first-person
      framing, unlike the true family memoirs (Route 66 with Grandpap, Mom's Enduring Faith & Love,
      Generational Lessons from Dad). Amazon also lists "Life's Fingerprints" under "Literature & Fiction."
      I categorized both as `fiction` in `src/data/books.ts` (5 fiction / 4 memoir / 1 children), which
      differs from the brief's original split. Note: Amazon's own category tags are self-selected by indie
      authors for ranking purposes and aren't fully authoritative — "Route 66 with Grandpap" is even tagged
      "Literary Fiction" on Amazon despite being a real memoir about Brian's own grandfather, so this signal
      alone isn't conclusive. Flag for Brian to confirm the intended fiction/memoir split.
- [ ] Real contact address/phone — the live `/contact` page shows Wix's default placeholder address
      ("500 Terry Francois Street, San Francisco, CA 94158") and phone ("123-456-7890"). These were NOT
      used anywhere in the new site (only the real email `brianbaleno9@gmail.com` was pulled in). If Brian
      wants a real mailing address or phone number displayed, get those from him directly.
