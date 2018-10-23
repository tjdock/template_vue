<template>
    <div class="container-fluid pt-3">
        <div class="row">
            <div class="col-2 px-1">
                <input type="text" class="form-control mb-1" placeholder="搜索品牌"
                       @input="setKeyOfBrand($event.target.value)">
                <div class="list-group">
                    <button type="button"
                            v-for="item in brands"
                            :key="item.brandId"
                            class="list-group-item list-group-item-action brand"
                            :class="{active:item.brandId===currentBrandId}"
                            :style="{'background-image': 'url('+imgsite+item.iconimg+')'}"
                            @click="getVehicle({brandId:item.brandId});currentBrandId=item.brandId">
                        {{item.brandname}}
                    </button>
                </div>
            </div>
            <div class="col-2 px-1">
                <input type="text" class="form-control mb-1" placeholder="搜索车型"
                       @input="setKeyOfVehicle($event.target.value)">
                <div class="list-group">
                    <button type="button"
                            v-for="item in carVehicle"
                            :key="item.vehicleId"
                            :class="{active:item.vehicleId===currentVehicleId}"
                            class="list-group-item list-group-item-action"
                            @click="getDisplacement({vehicleId:item.vehicleId});currentVehicleId=item.vehicleId">
                        {{item.vehiclename}}
                    </button>
                </div>
            </div>
            <div class="col-2 px-1">
                <input type="text" class="form-control mb-1" placeholder="搜索排量"
                       @input="setKeyOfDisplacement($event.target.value)">
                <div class="list-group">
                    <button type="button"
                            v-for="item in carDisplacement"
                            :key="item.pailiangId"
                            :class="{active:item.pailiangId===currentPailiangId}"
                            class="list-group-item list-group-item-action"
                            @click="getYear({vehicleId:currentVehicleId,pailiangId:item.pailiangId});currentPailiangId=item.pailiangId;currentYear=''">
                        {{item.engine_capacity}}
                    </button>
                </div>
            </div>
            <div class="col-2 px-1">
                <input type="text" class="form-control mb-1" placeholder="搜索年份"
                       @input="setKeyOfYear($event.target.value)">
                <div class="list-group">
                    <button type="button"
                            v-for="item in carYear"
                            :class="{active:item.productYear===currentYear}"
                            class="list-group-item list-group-item-action"
                            @click="getStyle({vehicleId:currentVehicleId,pailiangId:currentPailiangId,productYear:item.productYear});currentYear=item.productYear">
                        {{item.productYear}}
                    </button>
                </div>
            </div>
            <div class="col-2 px-1">
                <input type="text" class="form-control mb-1" placeholder="搜索车型"
                       @input="setKeyOfStyle($event.target.value)">
                <div class="list-group">
                    <button type="button"
                            v-for="item in carStyle"
                            :class="{active:item.carstyle_id===currentStyleId}"
                            class="list-group-item list-group-item-action"
                            @click="currentStyleId=item.carstyle_id;currentCarStyle=item.carstyle;currentVehicleDetailId=item.vehicle_detail_id">
                        {{item.carstyle}}
                    </button>
                </div>
            </div>
            <div class="col-2 px-1">
                <form>
                    <div class="form-group">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail"
                               :value="currentCarStyle">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="车架号"
                               v-model="vinno">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="车牌号"
                               v-model="plate_number">
                    </div>
                    <input type="button" class="btn btn-success" value="添加"
                           @click="addCar()"/>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "AddCar",
        data() {
            return {
                currentBrandId: '',
                currentVehicleId: '',
                currentPailiangId: '',
                currentYear: '',
                currentStyleId: '',
                currentCarStyle: '',
                currentVehicleDetailId: '',
                plate_number: '',
                vinno: ''
            }
        },
        computed: {
            ...mapGetters(['brands', 'keyOfBrand', 'imgsite', 'carVehicle', 'carDisplacement', 'carYear', 'carStyle'])
        },
        methods: {
            ...mapActions(['getBrands', 'setKeyOfBrand',
                'getVehicle', 'setKeyOfVehicle',
                'getDisplacement', 'setKeyOfDisplacement',
                'getYear', 'setKeyOfYear',
                'getStyle', 'setKeyOfStyle'
            ]),
            addCar() {
                let formData = {
                    vehicleid: this.currentVehicleId,
                    plate_number: this.plate_number,
                    vinno: this.vinno,
                    channelid: 0,
                    vehicle_detail_id: this.currentVehicleDetailId
                };

                this.$store.dispatch('addCar', formData);
            }
        },
        created() {
            this.getBrands();
        }
    }
</script>

<style scoped>
    .brand {
        padding-left: 4.5rem;
        background-repeat: no-repeat;
        background-position: 1.25rem 50%;
        background-size: 38px 38px;
    }
</style>