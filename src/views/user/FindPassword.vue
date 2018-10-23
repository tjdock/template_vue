<template>
    <div class="container">
        <form class="pt-5 col-md-8 col-sm-12 m-auto" @submit.prevent="onSubmit">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>手机号:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="请输入手机号"
                                   v-model.trim="mobile">
                            <div class="input-group-append">
                                <input class="btn btn-primary" type="button" value="发送" @click="send()">
                            </div>
                        </div>
                        <div class="invalid-feedback" :style="{'display':$v.mobile.$error?'block':'none'}">
                            <span v-if="!$v.mobile.required">手机不能为空</span>
                            <span v-if="!$v.mobile.regex">手机格式不对</span>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>短信验证码:</label>
                        <input type="text" class="form-control" placeholder="请输入短信验证码"
                               v-model.trim="validcode">
                        <div class="invalid-feedback" :style="{'display':$v.validcode.$error?'block':'none'}">
                            短信验证码不能为空
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>密码:</label>
                        <input type="password" class="form-control" placeholder="请输入密码"
                               v-model="onePwd">
                        <div class="invalid-feedback" :style="{'display':$v.onePwd.$error?'block':'none'}">
                            <span v-if="!$v.onePwd.required">密码不能为空</span>
                            <span v-if="!$v.onePwd.regex">密码长度6-20位，不能为纯数字或字母</span>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>确认密码:</label>
                        <input type="password" class="form-control" placeholder="请输入密码"
                               v-model="twoPwd">
                        <div class="invalid-feedback" :style="{'display':$v.twoPwd.$error?'block':'none'}">
                            确认密码与原密码不符
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">找回密码</button>
        </form>
    </div>

</template>

<script>
    import {required, helpers, sameAs} from 'vuelidate/lib/validators';
    import {REGEX_MOBILE, REGEX_PASSWORD} from '../../store/types';
    import {mapActions} from 'vuex';

    export default {
        name: "FindPassword",
        data() {
            return {
                mobile: '',
                validcode: '',
                onePwd: '',
                twoPwd: ''
            }
        },
        methods: {
            onSubmit() {
                this.$v.$touch();
                if (this.$v.$invalid) {

                } else {
                    let formData = {
                        mobile: this.mobile,
                        validcode: this.validcode,
                        onePwd: this.onePwd,
                        twoPwd: this.twoPwd
                    };

                    this.findPassword(formData);
                }
            },
            send() {
                this.$v.mobile.$touch();
                if (!this.$v.mobile.$invalid) {
                    let formData = {
                        mobile: this.mobile
                    };
                    this.findPasswordCode(formData);
                }
            },
            ...mapActions(['findPasswordCode', 'findPassword'])
        },
        validations: {
            mobile: {
                required,
                regex: helpers.regex('mobile', REGEX_MOBILE)
            },
            validcode: {
                required
            },
            onePwd: {
                required,
                regex: helpers.regex('password', REGEX_PASSWORD)
            },
            twoPwd: {
                required,
                sameAs: sameAs('onePwd')
            }
        }
    }
</script>

<style scoped>

</style>