<template>
    <div class="bg-white relative py-8 md:py-12 lg:py-24">
        <div class="relative">
            <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="text-lg font-semibold text-cyan-600">How We Work</h2>
                <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Business Driven
                    Development</p>
                <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                    Our working methodology provides a structured approach to defining your business needs
                    and designing a website that meets those requirements.
                </p>
            </div>
            <div class="mx-auto mt-12 grid gap-8 px-2 md:px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8">
                <div v-for="post in methodologyParts" :key="post.id"
                     class="flex flex-col overflow-hidden rounded-lg shadow-md">
                    <div class="flex-shrink-0">
                        <img class="h-48 w-full object-cover" :src="imageURL(post.imageUrl)" alt=""/>
                    </div>
                    <div class="flex flex-1 flex-col justify-between bg-gray-50  p-6">

                        <div class="flex-1">
                            <div class="mt-2 block h-48 ">
                                <!--
        <a :href="post.href" class="mt-2 block">
        -->
                                <p class="text-xl font-semibold text-teal-500 text-center">{{ post.title }}</p>
                                <p class="mt-3 text-base text-gray-500">{{ post.preview }}</p>
                                <!--
        </a>
        -->
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const methodologyParts = [
    {
        id: 0,
        title: 'Exploration',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: {name: 'Article', href: '#'},
        imageUrl:
              '/images/idea_1024x683.jpg',
        preview:
              'We start with a free, exploratory conversation to see whether there is a good fit between ' +
              'what you are trying to accomplish and the services we can provide.',
        author: {
            name: 'Roel Aufderehar',
            imageUrl:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '6 min',
    },
    {
        id: 1,
        title: 'Project Definition',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: {name: 'Article', href: '#'},
        imageUrl:
              '/images/project_defintion_1024x683.jpg',
        preview:
              'We delve deeper into what you are trying to achieve as a business and ' +
              'how a website and digital marketing might support those desired outcomes.',
        author: {
            name: 'Roel Aufderehar',
            imageUrl:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '6 min',
    },
    {
        id: 2,
        title: 'Proposal Development',
        href: '#',
        date: 'Mar 10, 2020',
        datetime: '2020-03-10',
        category: {name: 'Video', href: '#'},
        imageUrl:
              '/images/proposal_development_1024x684.jpg',
        preview:
              'We take a more detailed look at the aesthetic and functional design of the system ' +
              'to provide a costed proposal for the website development and ' +
              'any other activities we have agreed to incorporate into the project.',
        author: {
            name: 'Brenna Goyette',
            imageUrl:
                  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '4 min',
    },
    {
        id: 3,
        title: 'Design and Development',
        href: '#',
        date: 'Mar 10, 2020',
        datetime: '2020-03-10',
        category: {name: 'Video', href: '#'},
        imageUrl:
              '/images/design_and_development_1024x683.jpg',
        preview:
              'By using an iterative, interactive approach to design and development, ' +
              'we are able to get feedback on the design quickly ' +
              'and ensure problems are spotted and rectified early in the project.',
        author: {
            name: 'Brenna Goyette',
            imageUrl:
                  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '4 min',
    },
    {
        id: 4,
        title: 'Implementation',
        href: '#',
        date: 'Feb 12, 2020',
        datetime: '2020-02-12',
        category: {name: 'Case Study', href: '#'},
        imageUrl:
              '/images/implementation_1024x680.jpg',
        preview:
              'We can set up and deploy to our hosting services or yours, as needed. ' +
              'Included in the proposal is an agreed period of post-implementation support that ensures ' +
              ' the website is behaving as expected.',
        author: {
            name: 'Daniela Metz',
            imageUrl:
                  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '11 min',
    },
    {
        id: 5,
        title: 'Maintenance',
        href: '#',
        date: 'Feb 12, 2020',
        datetime: '2020-02-12',
        category: {name: 'Case Study', href: '#'},
        imageUrl:
              '/images/maintenance_1024x768.jpg',
        preview:
              'Choose between no-frills technical maintenance, ' +
              'aimed at keeping your website up to date and running smoothly, or comprehensive ' +
              'coverage that includes cost effective provisioning ' +
              'for new development.',
        author: {
            name: 'Daniela Metz',
            imageUrl:
                  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            href: '#',
        },
        readingLength: '11 min',
    },
]
const imageURL=(hrefName)=>{
    let tmpURL=new URL(hrefName, import.meta.url)
    //console.log(import.meta.url + " " + tmpURL)
    return tmpURL
}
</script>

<style scoped>

</style>