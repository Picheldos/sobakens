<template>
    <div class="RandomDog">
        <h2>Выбери породу:</h2>
        <div class="RandomDog__select">
            <v-select v-model="selectedBreed" :options="breeds" @update:modelValue="this.selectBreed" label="breed" ></v-select>
        </div>
        <img v-if="image" :src="image" alt="Random Dog" />
        <div class="RandomDog__buttons">
            <button @click="loadPreviousBreed">Назад</button>
            <button @click="loadNextBreed">Следующая</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import vSelect from "vue-select";

    export default {
        components: {
            vSelect,
        },
        data() {
            return {
                selectedBreed: '',
                image: '',
                breedHistory: [],
                breeds: [],
                n: 1
            };
        },
        methods: {
            async loadBreeds() {
                try {
                    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
                    this.breeds = Object.keys(response.data.message);
                    this.loadNextBreed();
                } catch (error) {
                    console.error(error);
                }
            },
            async loadBreedImage(breed) {
                try {
                    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
                    this.image = response.data.message;
                } catch (error) {
                    console.error(error);
                }
            },
            loadPreviousBreed() {
                if (this.breedHistory.length > this.n) {
                    this.n++;
                    this.selectedBreed = this.breeds[this.breedHistory[this.breedHistory.length - this.n]];
                    this.loadBreedImage(this.selectedBreed);
                }
            },
            selectBreed(option) {
                this.selectedBreed = option;
                this.loadBreedImage(option)
                this.breedHistory.push(this.breeds.indexOf(option))
            },
            async loadNextBreed() {
                try {
                    let randomBreed;
                    const randomIndex = Math.floor(Math.random() * this.breeds.length);

                    if (this.n === 1) {
                        randomBreed = this.breeds[randomIndex];
                        this.breedHistory.push(randomIndex);
                    } else {
                        this.n--
                        randomBreed = this.breeds[this.breedHistory[this.breedHistory.length - this.n]];
                    }
                    this.selectedBreed = randomBreed;
                    this.loadBreedImage(randomBreed);
                } catch (error) {
                    console.error(error);
                }
            },
        },
        mounted() {
            this.loadBreeds();
        },
    };
</script>

<style lang="scss" scoped>
    @import '~vue-select/dist/vue-select.css';

    .RandomDog {
        $root: &;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 120px 120px 0 120px;
        min-width: 100%;
        min-height: 100%;

        img {
            height: 40vw;
            object-fit: contain;
            border-radius: 10px;
            margin: 30px 0;
        }

        &__buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            button {
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

        @media screen and (max-width: 767px) {
            padding: 125px 25px 40px 25px;

            img {
                height: 80vw;
            }
        }



    }
</style>