// 外部HTMLファイルの内容を非同期で読み込む関数
async function loadTemplate(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `テンプレートを読み込めませんでした: ${response.statusText}`
    );
  }
  const text = await response.text();
  return text;
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // コンポーネントの定義
    const Home = {
      template: await loadTemplate("./components/home.html"),
    };
    const About = {
      template: await loadTemplate("./components/about.html"),
    };

    // ルート定義
    const routes = [
      { path: "/", component: Home },
      { path: "/about", component: About },
    ];

    // Vue Routerインスタンスの作成
    const router = new VueRouter({
      routes,
    });

    // Vueインスタンスの作成
    new Vue({
      el: "#app",
      router,
    });
  } catch (error) {
    console.error(error);
    alert(
      "テンプレートの読み込みに失敗しました。詳細はコンソールを確認してください。"
    );
  }
});
