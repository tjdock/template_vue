<template>
    <div class="container-fluid pt-3 mb-3 host">
        <div class="row">
            <div class="col-4">
                <div class="list-group">
                    <router-link :to="'/shop/'+shop.id" class="list-group-item d-flex list-group-item-action"
                                 v-for="(shop) in shops" :key="shop.id"
                                 :class="{active:storeid==shop.id}">
                        <img :src="imgsite+shop.iconimg" class="img-thumbnail iconimg">
                        <div class="text-truncate">
                            <p class="mb-0 ml-3 text-truncate">{{shop.address}}</p>
                            <p class="mb-0 ml-3">{{shop.phone}}</p>
                            <p class="mb-0 ml-3">适用范围：所有店通用</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-8">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ShopList",
        computed: {
            shops() {
                return this.$store.getters.shops;
            },
            imgsite() {
                return this.$store.getters.imgsite;
            },
            storeid() {
                return this.$store.getters.storeid.storeid;
            }
        },

        created() {
            this.$store.dispatch('getShops');
        }
    }
</script>

<style scoped>
    .host {
        font-size: 14px;
    }

    .iconimg {
        width: 70px;
        height: 70px;
    }
</style>