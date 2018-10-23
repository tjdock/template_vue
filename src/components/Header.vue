<template>
    <!--顶部开始-->
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">LOGO</router-link>
            <button class="navbar-toggler" v-appNavbarToggle>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <router-link tag="li" class="nav-item" to="/" active-class="active" exact>
                        <a class="nav-link">首页</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" to="/shop" active-class="active">
                        <a class="nav-link">门店列表</a>
                    </router-link>
                </ul>
                <ul class="navbar-nav">
                    <router-link tag="li" class="nav-item" to="/user/signup" active-class="active">
                        <a class="nav-link">注册</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" to="/user/login" active-class="active"
                                 v-if="!isAuthenticated">
                        <a class="nav-link">登录</a>
                    </router-link>
                    <li class="nav-item dropdown" v-if="isAuthenticated">
                        <a class="nav-link dropdown-toggle" v-appDropDown href="javascript:void(0)">
                            {{realname}}
                        </a>
                        <div class="dropdown-menu">
                            <router-link class="dropdown-item" to="/user/my-cars">我的车库</router-link>
                            <router-link class="dropdown-item" to="/user/add-cars">添加爱车</router-link>
                            <router-link class="dropdown-item" to="/user/edit-password">修改密码</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="javascript:void(0)" @click="logout()">注销</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!--顶部结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';

    export default {
        name: "Header",
        computed: {
            ...mapGetters(['realname','isAuthenticated'])
        },

        methods: {
            ...mapActions(['logout']),
        },
        directives: {
            'appDropDown': {
                inserted(el, binding, vnode) {
                    el.addEventListener('focus', () => {
                        const classes = el.parentNode.querySelector('.dropdown-menu').classList;
                        classes.add('show');
                    });

                    el.addEventListener('focusout', () => {
                        setTimeout(() => {
                            const classes = el.parentNode.querySelector('.dropdown-menu').classList;
                            classes.remove('show');
                        }, 500);
                    });
                }
            },
            'appNavbarToggle': {
                inserted(el, binding, vnode) {
                    el.addEventListener('click', () => {
                        const classes = el.parentNode.querySelector('.collapse.navbar-collapse').classList;
                        if (classes.contains('show')) {
                            classes.remove('show');
                        } else {
                            classes.add('show');
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>