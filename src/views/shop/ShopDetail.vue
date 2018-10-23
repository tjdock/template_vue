<template>
    <div class="row">
        <div class="col">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li v-for="(item,index) in shop.imgs" :class="{active:isActive(index)}" @click="navTo(index)"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item"
                         v-for="(item,index) in shop.imgs" :class="{active:isActive(index)}">
                        <img class="d-block w-100" :src="imgsite+item.imgurl">
                    </div>
                </div>
                <a class="carousel-control-prev" role="button" @click="prev()" href="javascript:void(0)">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" role="button" @click="next()" href="javascript:void(0)">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </div>
        </div>
        <div class="col">
            <p>店名：{{shop.storename}}</p>
            <p>咨询电话：{{shop.phone}}</p>
            <p>地址：{{shop.address}}</p>
            <div :innerHtml="shop.description"></div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "ShopDetail",
        data() {
            return {
                activeIndex: 0
            }
        },
        computed: {
            ...mapGetters(['shop', 'imgsCount', 'imgsite'])
        },
        watch: {
            '$route'(to, from) {
                this.getShop(to.params.id);
                this.activeIndex = 0;
            }
        },
        created() {
            this.getShop(this.$route.params.id);
        },
        methods: {
            getShop(id) {
                this.$store.dispatch('getShop', {storeid: id});
            },
            prev() {
                if (this.activeIndex === 0) {
                    this.activeIndex = this.imgsCount - 1;
                } else {
                    this.activeIndex--;
                }
            },
            next() {
                if (this.activeIndex === this.imgsCount - 1) {
                    this.activeIndex = 0;
                } else {
                    this.activeIndex++;
                }
            },
            navTo(i) {
                this.activeIndex = i;
            },
            isActive(i) {
                return this.activeIndex === i;
            }
        }
    }
</script>

<style scoped>

</style>