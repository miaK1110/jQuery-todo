$('.js-add-todo').on('click', function (e) {
  e.preventDefault();

  const addText = $('.js-get-val').val();
  $('js-get-val').val('');

  if (!addText) {
    $('js-toggle-error').show();
    console.log('put something');
    return;
  }

  $('.js-toggle-error').hide();

  const listItem =
    '<li class="p-listItem js-todo_list-item" data-text="' +
    addText +
    '">' +
    '<i class="c-icon p-listItem__iconTick far fa-check-circle js-click-done" aria-hidden="true">' +
    addText +
    '</i>' +
    '<span class="p-listItem__text js-todo_list-text">' +
    addText +
    '</span>' +
    '<input type="text" class="p-listItem__editText js-todo_list-editForm" value="' +
    addText +
    '">' +
    '<i class="c-icon p-listItem__iconBin fa fa-trash icon-trash js-click-trash" aria-hidden="true"></i>' +
    '</li>';

  $('.js-todo_list').prepend(listItem);
});

//【2. TODOタスクのアイコンを押下した際にタスクをDONEにする】
// 1. TODOタスクのアイコンを押下した際にイベントを発火
// 2. クリックしたDOM（アイコン）をdoneのアイコンに変更
// 3. クリックしたDOM（アイコン）にjs-click-doneのクラス名を削除し、js-click-todoのクラス名をつける
// 4. クリックしたDOM（アイコン）から辿って、list__itemのDOMを取得
// 5. list__itemのクラス名をdoneのものに変更する

// toggle to done the task

$(document).on('click', '.js-click-done', function () {
  $(this)
    .addClass('fas')
    .removeClass('far')
    .removeClass('js-click-done')
    .addClass('js-click-undo')
    .closest('.js-todo_list-item')
    .addClass('p-listItem--done');
});

// toggle to undo done task

$(document).on('click', '.js-click-undo', function () {
  $(this)
    .addClass('far')
    .removeClass('fas')
    .removeClass('js-click-undo')
    .addClass('js-click-done')
    .closest('.js-todo_list-item')
    .removeClass('p-listItem--done');
  console.log('aaaa');
});

// delete task

$(document).on('click', '.js-click-delete', function () {
  $(this)
    .closest('.js-todo_list-item')
    .fadeOut('slow', function () {
      this.remove();
    });
});

// edit task
$(document).on('click', '.js-todo_list-text', function () {
  $(this).hide().siblings('.js-todo_list-editForm').show();
  if ($('li').hasClass('p-listItem--done')) {
    alert(this);
    $(this).addClass('p-listItem__editText--done');
  }
});

$(document).on('change', 'js-todo_list-editForm', function (e) {
  console.log('aaaaaaaaaaaaaaaa');

  if (e.keycode == 13) {
    var $this = $(this);
    $this
      .hide()
      .siblings('.js-todo_list-text')
      .text($this.val())
      .show()
      .closest('.js-todo_list-item')
      .attr('data-text', $this.val());
  }
});
