<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col-md-3 col-sm-4 mb-3" v-for="(item,index) in myCars">
                <div class="card">
                    <img class="card-img-top p-5" :src="imgsite+item.brandimg">
                    <div class="card-body">
                        <h5 class="card-title">{{item.brandname}}-{{item.vehiclename}}</h5>
                        <p class="card-text" v-if="item.car_plate_number">车牌号：{{item.car_plate_number}}</p>
                        <p class="card-text" v-if="(!item.car_plate_number) && item.car_vinno">车架号：{{item.car_vinno}}</p>
                        <p class="card-text">{{item.carstyle==""?"详情不完整":item.carstyle}}</p>
                    </div>
                    <div class="card-footer">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" :id="'cb'+index" name="cb" class="custom-control-input"
                                   :checked="item.isdefault==1" @change="setMyCarDefault({carid: item.carid})">
                            <label class="custom-control-label" :for="'cb'+index">默认</label>
                        </div>
                        <button class="btn btn-sm btn-danger float-right" @click="deleteMyCar({carid: item.carid})">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "MyCars",
        computed: {
            ...mapGetters(['myCars','imgsite'])
        },
        methods: {
            ...mapActions(['getMyCars','setMyCarDefault','deleteMyCar'])
        },
        created() {
            this.getMyCars();
        }
    }
</script>

<style scoped>

</style>