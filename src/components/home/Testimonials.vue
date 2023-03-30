<script setup lang="ts">
const testimonialParts = [
    {
        id: 1,
        textClass: "mt-6 text-sm md:text-base font-medium text-white",
        textBlocks: [
            {
                id: 1,
                text: 'Peter helped us update and totally revamp our website in 2018. The ' +
                      'process was painless! He guided us through the brief, the stages and ' +
                      'the implementation with ease. We are so pleased with the result.'
            },
            {
                id: 2,
                text: 'The website is really easy to navigate and delivers the information in ' +
                      'an easy to read and understand format - all his work ! ' +
                      'He dealt with the video content and graphics with minimal input from ' +
                      'us but consulted us regularly.'
            },
            {
                id: 3,
                text: 'We are already seeing more traffic and enquiries coming through and ' +
                      'are continuing to work with him to maximise our FB and Google presence. ' +
                      'Oh, and the website was on time and in budget!'
            },
            {
                id: 3,
                text: 'If you’re thinking about updating your website speak to Peter! His ' +
                      'knowledge is amazing and he’s very easy to work with.'
            },
        ],
        from:
              'Chrissy Connelly',
        title:
              'Owner',
        client:
              'Principle Pilates',
        href:
              'https://principlepilates.com/',
        imageUrl:
              '/images/chrissy_1024x1024.jpg',
    },
    {
        id: 2,
        textClass: "mt-6 text-sm md:text-base font-medium text-white",
        textBlocks: [
            {
                id: 1,
                text: 'I am very pleased with the website Peter has produced for Little ' +
                      'Brook House.'
            },
            {
                id: 2,
                text: 'Peter has assessed the business needs and the website exactly ' +
                      'projects Little Brook House’s philosophy; ie the commitment to Person Centred ' +
                      'Care and pledge to Independent Living.'
            },
            {
                id: 3,
                text: 'I feel the reason for this is the time Peter invested in ' +
                      'understanding our business, learning about what we are trying to ' +
                      'achieve, about our individual, unique USP’s and hence has got across the key messages ' +
                      'to our prospective clients.'
            },
            {
                id: 4,
                text: 'Clients have complimented us on our website and it has ' +
                      'resulted in many additional telephone enquiries.'
            },
        ],
        from:
              'Linda Scott',
        title:
              'Director',
        client:
              'Little Brook House',
        href:
              'https://littlebrookhouse.co.uk/',
        imageUrl:
              '/images/linda_1024x1024.jpg',
    },
    {
        id: 3,
        textClass: "mt-6 text-sm md:text-base font-medium text-white",
        textBlocks: [
            {
                id: 1,
                text: ' I am extremely pleased with the website Peter designed and created.'
            },
            {
                id: 2,
                text: 'I had a clear idea of how I wanted my website to be perceived and he ' +
                      'completely took this on board and followed my vision and I am pleased to ' +
                      'say that I already appear to be receiving more enquires via the internet.'
            },
            {
                id: 3,
                text: 'The service Peter offers is exceptional and far more comprehensive ' +
                      'than I had anticipated! He guided me through a complete revamp of the ' +
                      'business and in the process helped me to explore and establish my ' +
                      'business aims and strategies.'
            },
            {
                id: 4,
                text: 'Thank you Peter – I look forward to working with you on an on-going basis.'
            },
        ],

        from:
              'Lorraine Romney',
        title:
              'Owner',
        client:
              'Affinity and Beyond Therapy',
        href:
              'https://affinity-and-beyond.co.uk/',
        imageUrl:
              '/images/lorraine_1024x1024.jpg',
    },
]

</script>
<template>
    <div class="bg-black py-16 md:py-24 lg:py-16">
        <div class="pb-2 md:pb-6 mx-auto max-w-md text-center sm:max-w-3xl lg:max-w-7xl ">
            <h2 class="text-lg font-semibold text-cyan-300">Testimonials</h2>
        </div>
        <p class="mt-2 mb-24 text-center text-3xl font-bold tracking-tight text-teal-500 sm:text-4xl">
            What Some Of Our Clients Say
        </p>

        <div class="lg:gap-8 md:gap-24 mt-8 md:mt-16 lg:mt-16 grid grid-cols-3 lg:px-8 md:px-8 px-2 ">
            <div
                  v-for="testimonial in testimonialParts"
                  :key="testimonial.id"
                  class="pt-8 lg:col-span-1 col-span-3 mt-8 pb-16 lg:z-10 lg:pb-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl
                            gap-8 px-8  ">
                <div class="mt-4 pb-16 lg:z-10 lg:pb-0">
                    <div class="relative">
                        <div aria-hidden="true" class="absolute inset-x-0"/>
                        <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:-my-32 md:-my-32 ">
                            <img class="inline-block h-24 w-24 md:h-48 md:w-48 rounded-full ring-4 ring-teal-500 "
                                 :src="testimonial.imageUrl"
                                 alt=""
                            />
                        </div>
                    </div>
                    <div class="">
                        <div class="lg:mt-24 md:mt-32 mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 lg:py-10 ">
                            <blockquote class="">
                                <svg class="h-6 w-6 text-white opacity-25" fill="currentColor"
                                     viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                </svg>
                                <div v-for="textBlock in testimonial.textBlocks"
                                     :key="textBlock.id">
                                    <div
                                          :class="testimonial.textClass"
                                    >
                                        {{ textBlock.text }}
                                    </div>

                                </div>
                                <div v-html="testimonial.text">
                                </div>
                                <footer class="mt-6 pb-4">
                                    <p class="text-base font-medium text-white">{{ testimonial.from }}</p>
                                    <p class="text-base font-medium text-cyan-100">{{ testimonial.title }} at
                                        <a :href="testimonial.href"
                                           target="_blank"
                                           class="h-10 w-10 rounded-full text-teal-200 underline">{{
                                                testimonial.client
                                            }}
                                        </a>
                                    </p>
                                </footer>
                            </blockquote>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
