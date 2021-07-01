"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    { q: "WEBサイトを閲覧するブラウザは何種類かあり、主要なブラウザ間でも差異があるため全てで確認する必要がある", c: ["◯", "☓"] },
    { q: "サイトを公開するにはサーバーにデータをアップロードする必要があるが、確認をするだけならローカル環境で可能である", c: ["◯", "☓"] },
    { q: "サイトのデータをアップロードするためのサーバーを自分で構築するのは違法である", c: ["☓", "◯"] },
    { q: "ドメインには様々な種類があり、使用するサイトの職種や地域に合わせて考えていく必要があるが、そのドメインは何を使っても年間の使用料金は変わらない", c: ["☓", "◯"] },
    { q: "サイトのURL（アドレス）は本来数字の羅列で構成されている", c: ["◯", "☓"] },
    { q: "WEBサイトを閲覧する環境はパソコンよりもモバイルからの流入が多くなった", c: ["◯", "☓"] },
    { q: "「モバイルファースト」とは「スマホがなければ何もできない」という人たちの生き方である", c: ["☓", "◯"] },
    { q: "WEBサイトはあくまで情報を取得するためのものなので「使う」という事はあまり考えずに作成する", c: ["☓", "◯"] },
    { q: "WEBサイトを閲覧するブラウザはいくつかあるが、日本国内だと現在InternetExplorerが１番シェア率が高いブラウザである", c: ["☓", "◯"] },
    { q: "Wi-Fi環境が整いつつある現状では、データ量は重くてもまったく問題ないので気にする必要はない", c: ["☓", "◯"] },
    { q: "htmlのタグは入れ子の構造で記述される", c: ["◯", "☓"] },
    { q: "<head></head>内に記述した命令がブラウザ上に表示される", c: ["☓", "◯"] },
    { q: "<body></body>内に記述するタグには「必ず」終了タグを表記しなければならない", c: ["☓", "◯"] },
    { q: "CSSは見た目の装飾部分を指定するものである", c: ["◯", "☓"] },
    { q: "タグで文字列を囲うと文字が太くなるなどの変化が現れることがあるが、そのために各タグを使い分けるのではなく、そのタグの意味を与えることが目的である", c: ["◯", "☓"] },
    // { q: "", c: ["C0", "C1", "C2"] },
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
      if(isAnswered){
        return;
      }
      isAnswered = true;

      if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
  }else{
      li.classList.add('wrong');
  }

  btn.classList.remove('disabled');
}

  function setQuiz() {
      isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
        btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
      if(btn.classList.contains('disabled')){
          return;
      }
      btn.classList.add('disabled');

      if (currentNum === quizSet.length - 1){
          scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
          result.classList.remove('hidden');
      }else{
          currentNum++;
          setQuiz();
      }
  });
}
