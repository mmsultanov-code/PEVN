<template>
    <section class="single-news-section">
        <div class="container xs">
            <div class="flex-side list list-md">
                <h2>{{ post.name }}</h2>
                <button class="theme-button bordered" @click="$router.go(-1)">вернутся</button>
            </div>
            <div class="spacer xs"></div>
            <news-box
				cname="div"
				:name="post.name"
				:slug="post.slug"
				:content="post.content"
				:excerpt="post.content"
				:post_thumbnail="baseUrl + post.background_image"
				type="single"
            ></news-box>
            <div class="spacer"></div>
            <div class="flex-side list list-md">
                <button class="theme-button bordered" @click="$router.go(-1)">вернутся</button>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
import newsBox from '@/components/news.box.vue'
export default {
	name: 'single-news',
	components: {
		newsBox
	},
	data() {
		return {
			post: []
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
				const response = await axios.get('/posts/' + this.$route.params.slug)
				this.post = response.data
			} catch(err) {
				throw err
			}
		}
	}
}
</script>
<style lang="scss">
.single-news-section {
    padding: 6rem;
}
</style>