<template>
<section class="pos-f-t">
    <section class="collapse" id="navbarToggleExternalContent">
        <article class="bg-dark p-4">
            <h4 class="text-white">Accessibility Settings menu</h4>
            <p class="text-white mt-3">Please select your prefered display settings.</p>

            <p><b>Font-Family:</b></p>
            <select class="font-select" aria-label="Select font-family" v-model="fontFamily" @change="setFontFamily" id="fontFamilyDropdown">
                <option selected value="segoeUi">Segoe UI</option>
                <option value="calibri">Calibri</option>
                <option value="arial">Arial</option>
                <option value="timesNewRoman">Times New Roman</option>
                <option value="comicSans">Comic Sans</option>
            </select>
            <br />

            <label class="mt-3" for="fontSizeRange"><b>Font-Size:</b></label>
            <p> - <input type="range" class="range" min="90" max="110" step="5" v-model="fontSize" @change="setFontSize" id="fontSizeRange" /> + </p>
            <label for="fontWeightRange"><b>Font-Weight:</b></label>
            <p> - <input type="range" class="range" min="400" max="800" step="200" v-model="fontWeight" @change="setFontWeight" id="fontWeightRange" /> + </p>

            <p class="mt-3" for="colorBlindnessOptimizationDropdown"><b>Color Blindness optimization:</b></p>
            <select class="form-select accessibilityDropdown" aria-label="Select color disability optimization" v-model="colorBlindnessOptimization" @change="setColorBlindnessOptimization" id="colorBlindnessOptimizationDropdown">
                <option value="disabled">Disabled</option>
                <option selected value="deuteranopia">Deuteranopia (no Green)</option>
                <option value="protanopia">Protanopia (no Red)</option>
                <option value="tritanopia">Tritanopia (no Blue)</option>
            </select>

            <p class="mt-3"><b>Keyboard navigation optimization:</b></p>
            <select class="form-select accessibilityDropdown" aria-label="Select keyboard navigation optimization" v-model="keyboardNavigationOptimization" @change="setKeyboardNavigationOptimization" id="keyboardNavigationOptimizationDropdown">
                <option value="false">Disabled</option>
                <option selected value="true">Enabled</option>
            </select>
        </article>
    </section>

    <nav class="navbar navbar-expand-lg navbar-light">
        <section class="container-fluid">
            <router-link class="navbar-brand" to="/">AbilityPay</router-link>
            <button type="button" class="btn btn-accessibility my-2" id="accessibilitySettingsButton" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle accessibility settings">
                <span><span v-if="keyboardNavigationOptimization == 'true'">(9) </span>Accessibility settings</span>
            </button>

            <router-link v-if="windowWidth > 1200 && this.jwt !== undefined && this.jwt !== ''" type="button" class="btn btn-danger my-2" id="exitButton" @click="logout" to="/login">
                <span><span v-if="keyboardNavigationOptimization == 'true'">(0) </span>EXIT</span>
            </router-link>

            <p v-if="windowWidth > 1200 && this.jwt == undefined || windowWidth > 1200 && this.jwt === ''" class="mx-5">          </p>

            <article v-if="windowWidth <= 1200">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <aside v-if="jwt === undefined || jwt === ''" class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav w-100 mx-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/login">Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" tag="li" active-class="active" to="/register">Register</router-link>
                        </li>
                    </ul>
                </aside>

                <section v-else-if="jwt !== undefined && jwt !== '' && this.user.roles !== 'Admin'" class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav w-100">
                        <li class="nav-item">
                            <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/" exact>Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" tag="li" active-class="active" to="/transactions">Transactions</router-link>
                        </li>
                        <li class="nav-item dropdown ml-auto">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">{{ user.firstName }} {{ user.lastName }}</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <router-link class="dropdown-item" to="/settings">Settings</router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/bank-accounts">Bank accounts</router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" @click="logout" to="/login">Log out</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>

                    <section v-else-if=" jwt !== undefined && jwt !== '' && this.user.roles === 'Admin'" class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav w-100">
                            <li class="nav-item">
                                <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/" exact>Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" tag="li" active-class="active" to="/admin/users" exact>Manage Users
                                </router-link>
                            </li>
                            <li class="nav-item dropdown ml-auto">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">{{ user.firstName }} {{ user.lastName }}</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <router-link class="dropdown-item" to="/settings">Settings</router-link>
                                    </li>
                                    <li>
                                        <router-link class="dropdown-item" to="/bank-accounts">Bank accounts</router-link>
                                    </li>
                                    <li>
                                        <router-link class="dropdown-item" @click="logout" to="/login">Log out</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
            </article>
        </section>
    </nav>
</section>
</template>

<script>
export default {
    name: "Header",
    props: ["user", "jwt"],

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
        document.addEventListener( "keydown", this.onKeydown );
    },
    methods: {
        onKeydown( event ) {
            
        if (this.keyboardNavigationOptimization == "true" && event.target.nodeName !== "INPUT") {
                if(event.key === '9') {
                    document.getElementById("accessibilitySettingsButton").focus();
                }
                if(event.key === '0') {
                    document.getElementById("exitButton").focus();
                }
            }
        },

        logout(e) {
            e.preventDefault();
            this.$parent.logout();
        },
        setFontFamily() {
            this.$parent.setFontFamily(this.fontFamily);
        },
        setFontSize() {
            this.$parent.setFontSize(this.fontSize);
        },
        setFontWeight() {
            this.$parent.setFontWeight(this.fontWeight);
        },
        setColorBlindnessOptimization() {
            this.$parent.setColorBlindnessOptimization(
                this.colorBlindnessOptimization                  
            );
        },
        setKeyboardNavigationOptimization() {
            this.$parent.setKeyboardNavigationOptimization(
                this.keyboardNavigationOptimization
            );
        },        
    },
    data() {
        return {
            windowWidth: window.innerWidth,
            fontFamily: "segoeUi",
            fontSize: "100%",
            fontWeight: "600",
            colorBlindnessOptimization: "deuteranopia",
            keyboardNavigationOptimization: "true"
        };
    },
};

</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
    font-size: 1.8em;
    padding: 0.2em;
    color: #343a40;
}

.navbar-brand:hover {
    color: #2a2e32;
}

.navbar-light {
    background-color: rgb(240, 240, 240);
}

.nav-item {
    font-size: 1.4em;
}

.active {
    font-weight: bold;
}

.logout-link {
    font-size: 1.8em;
    font-weight: bolder;
}

.btn-secondary {
    background-color: darkred;
}

.btn-secondary:hover {
    background-color: rgb(179, 20, 20);
}

@media screen and (min-width: 992px) {
    
    .btn {
        background-color: rgb(250, 250, 250);
        color: #343a40;
        border-color: #343a40;
        border-width: 0.25em;
    }

    .btn:hover {
        color: rgb(250, 250, 250);
        background-color: #343a40;
        border-color: #343a40;
    }

     .btn:focus {
        color: rgb(250, 250, 250);
        background-color: #343a40;
        border-color: #343a40;
    }

    .btn-accessibility {
        padding-left: 7rem;
        padding-right: 7rem;
        margin-right: 2.5rem;
        font-size: 1.5em;
        font-weight: bold;
    }

    .btn-danger {
        font-size: 1.6em;
        font-weight: bolder;
        padding-left: 1em;
        padding-right: 1em;
    }

    .range {
        width: 10%;
    }

}
</style>
