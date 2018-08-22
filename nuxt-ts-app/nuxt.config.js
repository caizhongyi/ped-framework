const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
});

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000";
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost";
module.exports = {
  env: {
    baseUrl:
      process.env.BASE_URL ||
      `http://${host}:${port}`
  },
  head: {
    title: "admin",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js project"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ],
    script: [
      //{ innerHTML: require('./static/flexible.js') + ';console.log(11)' , type: 'text/javascript', charset: 'utf-8'},
      //{ src:'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' },
      //{ src: './js/flexible.js' }
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#4d5080" },
  /*
  ** Build configuration
  */
  css: [
    "~/assets/css/main.styl",
    "font-awesome/css/font-awesome.css",
    "iview/dist/styles/iview.css"
  ],
  env: {
    __ENV: process.env.__ENV
  },
  plugins: [
    { src: "~plugins/iview", ssr: true },
   // { src: "~plugins/flexible", ssr: false }
  ],
  build: {
    vendor: [
      "axios",
      "iview"
    ],
    postcss: [
      //rem自适应
     /* require('postcss-px2rem')({
        remUnit: 75
      })*/
    ],
    extend(config, ctx) {
      for (let o of config.module.rules) {
        if (o.loader == "vue-loader") {
          delete o.loader;
          o.use = [
            {
              loader: "vue-loader",
              options: o.options
            }
            ,
            {
              loader: "iview-loader",
              options: {
                prefix: true
              }
            }
          ];
          delete  o.options;
          /* o.options.loaders.iview = [{
               loader: 'iview-loader',
               options: {
                   prefix: true
               }
           }]*/
        }
      }
      if (ctx.isClient) {
       /* config.entry['polyfill'] = ['babel-polyfill']
        Object.assign(config.resolve.alias, {
          'utils': path.resolve(__dirname, 'utils')
        })*/
      }
    }
  },
  /* babel:{
       "plugins": [["component", [
           {
               "libraryName": "iview"
           }
       ]]],
       comments: true
   },*/
  modules: [
    "@nuxtjs/axios",
    "~/modules/typescript.js"
  ],
  axios: {}
};

if(process.browser){
  //require('lib-flexible')
}