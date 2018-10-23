<template>
    <div class="container">
        <form class="pt-5 col-md-4 col-sm-6 m-auto" @submit.prevent="onSubmit">
            <div class="form-group">
                <label>手机号:</label>
                <input type="text" class="form-control" placeholder="请输入手机号"
                       v-model.trim="mobile">
                <div class="invalid-feedback" :style="{'display':$v.mobile.$error?'block':'none'}">
                    <span v-if="!$v.mobile.required">手机不能为空</span>
                    <span v-if="!$v.mobile.regex">手机格式不对</span>
                </div>

            </div>
            <div class="form-group">
                <label>密码:</label>
                <input type="password" class="form-control" placeholder="请输入密码"
                       v-model="password">
                <div class="invalid-feedback" :style="{'display':$v.password.$error?'block':'none'}">
                    <span v-if="!$v.password.required">密码不能为空</span>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">登录</button>
                <input type="button" class="btn btn-link" value="忘记密码" @click="findPdw()"/>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, helpers} from 'vuelidate/lib/validators';
    import {REGEX_MOBILE} from '../../store/types'
    import {mapActions} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                mobile: '15620089975',
                password: 'Aa123456'
            }
        },
        methods: {
            ...mapActions(['signinUser']),
            findPdw() {
                this.$router.push('find-password')
            },
            onSubmit() {
                this.$v.$touch();
                if (this.$v.$invalid) {

                } else {
                    let formData = {
                        mobile: this.mobile,
                        password: this.password
                    };

                    this.signinUser(formData)
                }

            }
        },
        validations: {
            mobile: {
                required,
                regex: helpers.regex('mobile', REGEX_MOBILE)
            },
            password: {
                required
            }
        }
    }
</script>

<style scoped>

</style>