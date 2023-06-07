<template>
    <div class="RandomDogs">
        <div class="RandomDogs__images">
            <div v-for="dog in dogs" :key="dog" class="RandomDogs__images-wrapper">
                <img :src="dog" alt="Dog">
            </div>
        </div>
        <button class="RandomDogs__button" @click="loadMore">Загрузить еще</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import axios from 'axios';

    export default defineComponent({
        name: 'RandomDogs',
        data() {
            return {
                dogs: [] as string[],
                page: 1,
            };
        },
        methods: {
            async loadMore() {
                this.page++;
                const response = await axios.get(`https://dog.ceo/api/breeds/image/random/20?page=${this.page}`);
                this.dogs = [...this.dogs, ...response.data.message];
            },
        },
        async mounted() {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random/20');
            this.dogs = response.data.message;
        },
    });
</script>

<style lang="scss" scoped>
    .RandomDogs {
        $root: &;
        display: flex;
        flex-direction: column;
        padding: 125px 25px 40px 25px;
        min-width: 100%;
        min-height: 100%;

        &__images {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;



            &-wrapper {
                max-width: 300px;
                max-height: 300px;
                padding: 20px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;

                    transition: transform 0.3s ease-in-out;

                    &:hover {
                        transform: scale(1.15);
                    }
                }

                @media screen and (max-width: 767px) {
                    max-width: 100%;
                    width: 100%;
                    padding: 0;
                    margin-bottom: 20px;

                    img:hover {
                        transform: none;
                    }
                }
            }
        }

        &__button {
            margin: 30px auto 0 auto;
            border: none;
            background-color: #f397e2;
            padding: 10px 15px;
            color: white;
            border-radius: 10px;

            font-size: 24px;

            transition: background-color 0.3s ease-in-out;

            &:hover {
                cursor: pointer;
                background-color: #e28dcf;
            }
        }
    }
</style>
