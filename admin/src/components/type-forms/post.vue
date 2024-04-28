<template>
    <form class="type-form-container">
        <div class="flex-side list">
            <h1 v-if="state === 'create'">Создание</h1>
            <h1 v-if="state === 'edit'">Редактирование</h1>
            <button class="theme-button" type="button" @click="$router.go(-1)">Назад</button>
        </div>
        <div class="main-flex flex-side w100 list list-md top">
            <div class="left-side">
                <form-box label="основное">
                    <div class="form-group">
                        <label for="your-name">name</label>
                        <input type="text" v-model="post.name" id="your-name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-slug">slug</label>
                        <input type="text" v-model="post.slug" id="your-slug" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="your-content">content</label>
                        <ckeditor :editor="editor" v-model="post.content" :config="editorConfig"></ckeditor>
                    </div>
                </form-box>
                <div class="flex-side list list-lg top">
                    <div class="container xs left">
                        <h2>Как будет выглядить во внутренней странице</h2>
                        <news-box
                            cname="div"
                            :name="post.name"
                            :slug="post.slug"
                            :content="post.content"
                            :excerpt="post.content"
                            :thumbnail="get_image('thumbnail')"
                            :post_thumbnail="get_image('background_image')"
                            type="single"
                        />
                    </div>
                    <div class="preview-box-container mw xs">
                        <h2>Как будет выглядить превью</h2>
                        <news-box
                            cname="a"
                            :href="frontUrl + '/news/' + post.slug"
                            target="_BLANK"
                            :name="post.name"
                            :slug="post.slug"
                            :content="post.content"
                            :excerpt="post.content"
                            :thumbnail="get_image('thumbnail')"
                            :post_thumbnail="get_image('background_image')"
                        >
                        </news-box>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <form-box label="Публикация">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quasi suscipit rem accusamus similique sint error sapiente molestiae provident, magni, laboriosam odio. Aliquam, corrupti reiciendis. Quia nemo placeat molestiae facilis?</p>
                    <button class="theme-button w100" type="button" v-if="state === 'edit'" @click="update()">сохранить</button>
                    <button class="theme-button w100" type="button" v-if="state === 'create'" @click="createNew()">опубликовать</button>
                </form-box>
                <form-box label="Превью изображения">
                    <input type="file" @change="upload_file($event, 'thumbnail')" ref="thumbnail" name="thumbnail" id="thumbnail" class="file-control form-control" />
                    <img class="thumbnail-img" :src="get_image('thumbnail')" v-if="post.thumbnail" alt="">
                </form-box>
                <form-box label="Внутреннее изображение">
                    <input type="file" @change="upload_file($event, 'background_image')" ref="background_image" name="background_image" id="background_image" class="file-control form-control" />
                    <img class="thumbnail-img" :src="get_image('background_image')" v-if="post.background_image" alt="">
                </form-box>
            </div>
        </div>
    </form>
</template>
<script>
import axios from 'axios'
import formBox from '@/components/form-box.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert'
import newsBox from '@/components/news-box.vue'
export default {
    name: 'post-form',
    components: {
        newsBox,
        formBox
    },
    props: {
        state: {
            type: String,
            required: true,
            validator: function(value) {
                return ['create', 'edit'].indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
            post: {
                name: '',
                slug: '',
                content: '',
                thumbnail: '',
                background_image: '',
            },
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
            }
        }
    },
    computed: {
        baseUrl: function() {
            return process.env.VUE_APP_PUBLIC
        },
        frontUrl: function() {
            return process.env.VUE_APP_FRONT_URL
        }
    },
    mounted() {
        if (this.state === 'edit') this.init()
    },
    methods: {
        get_image: function(fieldName) {
            if(this.post[fieldName][0] === '/') return this.baseUrl + this.post[fieldName]
            else return this.baseUrl + '/' + this.post[fieldName]
        },
        upload_file: async function(event, fieldName) {
            const files = event.target.files
            let formData = new FormData()

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            try {
                const response = await axios.post('/file/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.post[fieldName] = response.data.files[0].path
            } catch(err) {
                throw err;
            }
        },
        update: async function() {
            try {
                const response = await axios.put('/posts/' + this.$route.params.id, this.post)
                swal({
                    title: "Обновлено",
                    text: "Данная запись успешно обновлена",
                    icon: "success"
                }).then((value) => {
                    if(value) {
                        this.$router.push({name: "Post"})
                    }
                })
            } catch(err) {
                throw err
            }
        },
        createNew: async function() {
            try {
                const response = await axios.post('/posts', this.post)
                this.post = response.data
                this.$router.push({name: 'PostEdit', params: {id: this.post.id}})
            } catch(err) {
                throw err
            }
        },
        init: async function() {
            try {
                const response = await axios.get('/posts/' + this.$route.params.id)
                this.post = response.data
            } catch(err) {
                throw err
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .type-form-container {
        .main-flex {
            & > .left-side {
                max-width: 100%;
                width: 100%;
            }
            & > .right-side {
                max-width: 320px;
                width: 100%;
            }
        }
        .file-control {
            margin-bottom: 18px;
        }
    }
</style>