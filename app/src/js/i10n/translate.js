(function () {
    angular.module("app").config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider.translations('en', {
                "todo.input": "Add a new memo",
                "todo.create": "Add",
                "todo.loading": "Loading ....",
                "edit.text": "Please enter a todo",
                "edit.save": "Save"
            });
            $translateProvider.translations('zh', {
                "todo.input": "增加新的备忘录",
                "todo.create": "添加",
                "todo.loading": "正在加载....",
                "edit.text": "请输入todo",
                "edit.save": "保存"
            });
            $translateProvider.registerAvailableLanguageKeys(['en', 'zh'], {});
            $translateProvider.determinePreferredLanguage();
  }]);
})();