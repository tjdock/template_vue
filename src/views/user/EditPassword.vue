<template>
    <div class="container">
        <form class="pt-5 col-md-4 col-sm-6 m-auto" @submit.prevent="onSubmit">
            <div class="form-group">
                <label>原始密码:</label>
                <input type="password" class="form-control" placeholder="请输入原始密码"
                       v-model="oldPwd">
                <div class="invalid-feedback" :style="{'display':$v.oldPwd.$error?'block':'none'}">
                    <span v-if="!$v.oldPwd.required">密码不能为空</span>
                    <span v-if="!$v.oldPwd.regex">密码长度6-20位，不能为纯数字或字母</span>
                </div>
            </div>
            <div class="form-group">
                <label>新密码:</label>
                <input type="password" class="form-control" placeholder="请输入新密码"
                       v-model="onePwd">
                <div class="invalid-feedback" :style="{'display':$v.onePwd.$error?'block':'none'}">
                    <span v-if="!$v.onePwd.required">密码不能为空</span>
                    <span v-if="!$v.onePwd.regex">密码长度6-20位，不能为纯数字或字母</span>
                </div>
            </div>
            <div class="form-group">
                <label>确认密码:</label>
                <input type="password" class="form-control" placeholder="请输入确认密码"
                       v-model="twoPwd">
                <div class="invalid-feedback" :style="{'display':$v.twoPwd.$error?'block':'none'}">
                    确认密码与原密码不符
                </div>
            </div>
            <button type="submit" class="btn btn-primary">修改</button>
        </form>
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import {REGEX_MOBILE, REGEX_PASSWORD} from '../../store/types';
    import {required, helpers, sameAs} from 'vuelidate/lib/validators';

    export default {
        name: "EditPassword",
        data() {
            return {
                oldPwd: '',
                onePwd: '',
                twoPwd: ''
            }
        },
        methods: {
            ...mapActions(['editPassword']),
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let formData = {
                        oldPwd: this.oldPwd,
                        onePwd: this.onePwd,
                        twoPwd: this.twoPwd
                    };

                    this.editPassword(formData);
                }
            }
        },
        validations: {
            oldPwd: {
                required,
                regex: helpers.regex('oldPwd', REGEX_PASSWORD)
            },
            onePwd: {
                required,
                regex: helpers.regex('onePwd', REGEX_PASSWORD)
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