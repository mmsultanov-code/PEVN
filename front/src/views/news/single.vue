<template>
    <section class="single-news-section">
        <div class="container xs">
            <news-box
				cname="div"
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
	}
}
</script>
<style lang="scss">
.single-news-section {
    padding: 6rem;
}
</style>