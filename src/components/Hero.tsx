import { type Review } from './ReviewCard'
import ReviewCarousel from './ReviewCarousel'
import { ChevronRight } from './Icons'

const reviews: Review[] = [
  {
    name: 'Salenaa Xendya',
    avatar: '/images/avatars/1.svg',
    rating: 5,
    postedAgo: '1 hour ago',
    body: "Great service! The staff at Neptune's Catch were very attentive. They helped me find the perfect lobster and even showed me how to cook it. I'll definitely be back!",
    food: 5,
    service: 5,
    atmosphere: 5,
    ownerIcon: '/images/restaurant-icons/1.svg',
    replyAgo: 'Just now',
    ownerReply:
      "Thanks, Salenaa Xendya! We're thrilled to hear that you enjoyed your experience at Neptune's Catch. We strive to provide the best seafood and service!",
  },
  {
    name: 'Bradley Lawlor',
    avatar: '/images/avatars/2.svg',
    rating: 3,
    postedAgo: '30 minutes ago',
    body: 'The staff was great and very helpful, but my order took longer than expected and the crab cakes were overdone. I appreciate the service, but I was expecting a better experience.',
    food: 4,
    service: 3,
    atmosphere: 5,
    ownerIcon: '/images/restaurant-icons/2.svg',
    replyAgo: 'Just now',
    ownerReply:
      "Hi Bradley, we're sorry to hear that your crab cakes were not up to par and that your order took longer than expected. We'll be sure to address these issues and hope to see you again soon!",
  },
  {
    name: 'Corina McCoy',
    avatar: '/images/avatars/3.svg',
    rating: 5,
    postedAgo: '10 minutes ago',
    body: 'We had a bit of a wait, but it was prime time on a Saturday. The host was very apologetic and kept us informed. The seafood tower was amazing and the ambiance was perfect for a date night.',
    food: 5,
    service: 5,
    atmosphere: 5,
    ownerIcon: '/images/restaurant-icons/3.svg',
    replyAgo: 'Just now',
    ownerReply:
      "Hi Corina, thank you for the kind words! We're so glad to hear that you enjoyed your date night and that our host was able to make your wait more pleasant. We hope to see you again soon!",
  },
]

export default function Hero() {
  return (
    <section className='relative overflow-hidden bg-white'>
      {/* headline */}
      <div className='mx-auto w-full max-w-330 px-5 pt-8 text-center sm:px-6 sm:pt-14 lg:px-10 lg:pt-24'>
        <h1 className='font-[family-name:var(--font-radio-canada-big)] mx-auto max-w-215 font-bold leading-[1.08] tracking-[-0.015em] text-ink text-[28px] sm:text-[44px] md:text-[56px] lg:text-[68px]'>
          Stop Losing Customers
          <br className='hidden sm:block' /> From Unanswered{' '}
          <span className='text-accent'>Reviews</span>
        </h1>
        <p className='mx-auto mt-3 max-w-160 text-[14px] leading-5.5 text-ink-soft/85 sm:mt-7 sm:text-[18px] sm:leading-7'>
          RestruHub helps you reply to every review, understand what customers
          are unhappy about, and fix issues before they affect your rating and
          reputation.
        </p>
      </div>

      {/* band: pills + cards on the hero-band background */}
      <div className='hero-band relative -mt-6 w-full pt-11 sm:-mt-8 sm:pt-14 lg:-mt-14 lg:pt-20'>
        {/* pill cluster */}
        <div className='relative z-10 flex items-center justify-center gap-2 px-3 sm:gap-6 sm:px-0'>
          <a
            href='#start'
            className='btn-cta btn-cta--primary inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium text-white sm:h-16 sm:px-10 sm:text-[18px]'
          >
            <span className='btn-cta__inner'>
              <span className='btn-cta__text'>
                <span>Start Free Trial</span>
                <span className='btn-arrow'>
                  <ChevronRight width={18} height={18} />
                </span>
              </span>
            </span>
          </a>
          <a
            href='#how'
            className='btn-cta btn-cta--secondary inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium sm:h-16 sm:px-10 sm:text-[18px]'
          >
            <span className='btn-cta__inner'>
              <span className='btn-cta__text'>
                <span>See How It Works</span>
                <span className='btn-arrow'>
                  <ChevronRight width={18} height={18} />
                </span>
              </span>
            </span>
          </a>
        </div>

        <ReviewCarousel reviews={reviews} />
      </div>
    </section>
  )
}
