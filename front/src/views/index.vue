<template>
	<div class="home">
		<section class="news-section">
			<div class="container">
				<h2>Новости</h2>
				<div class="news-box-container">
					<div class="columns-container column-4">
						<newsBox
							v-for="(post, post_index) in posts" :key="`index-post-${post_index}`"
							:to="{name: 'singleNews', params: {slug: post.slug}}"
							:name="post.name"
							:thumbnail="baseUrl + post.thumbnail"
							:excerpt="post.content"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios'
import newsBox from '@/components/news.box.vue'
export default {
	name: 'HomeView',
	components: {
		newsBox
	},
	data() {
		return {
			posts: []
		}
	},
	computed: {
		baseUrl: function() {
			return process.env.VUE_APP_BACK_URL
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init: async function() {
			try {
				const response = await axios.get('/posts/')
				this.posts = response.data
			} catch(err) {
				throw err
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.news-section {
	padding: 3rem 0;
}
</style>