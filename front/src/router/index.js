import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/index.vue')
	},
	{
		path: '/news',
		component: () => import('../views/news/index.vue'),
		children: [
			{
				path: ':slug',
				name: 'singleNews',
				component: () => import('../views/news/single.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
