$('.js-add-todo').on('click', function (e) {
  e.preventDefault();

  const addText = $('.js-get-val').val();
  $('.js-get-val').val('');

  if (!addText) {
    $('.js-toggle-error').show();
    return;
  }

  $('.js-toggle-error').hide();

  const listItem =
    '<li class="p-listItem js-todo_list-item" data-text="' +
    addText +
    '">' +
    '<i class="c-icon p-listItem__iconTick far fa-check-circle js-click-done" aria-hidden="true"></i>' +
    '</i>' +
    '<span class="p-listItem__text js-todo_list-text">' +
    addText +
    '</span>' +
    '<input type="text" class="p-listItem__editText js-todo_list-editForm" value="' +
    addText +
    '">' +
    '<i class="c-icon p-listItem__iconBin fa fa-trash icon-trash js-click-delete" aria-hidden="true"></i>' +
    '</li>';
  $('.js-todo_list').prepend(listItem);
});

// toggle to set todo to done

$(document).on('click', '.js-click-done', function () {
  $(this)
    .addClass('fas')
    .removeClass('far')
    .removeClass('js-click-done')
    .addClass('js-click-undo')
    .closest('.js-todo_list-item')
    .addClass('p-listItem--done');
});

// toggle to set todo to undone

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

// delete todo

$(document).on('click', '.js-click-delete', function () {
  $(this)
    .closest('.js-todo_list-item')
    .fadeOut('slow', function () {
      this.remove();
    });
});

// edit todo

$(document).on('click', '.js-todo_list-text', function () {
  $(this).hide().siblings('.js-todo_list-editForm').show().focus();
});

$(document).on('focus', '.js-todo_list-editForm', function () {
  $(this).select();
});

$(document).on('keyup', '.js-todo_list-editForm', function (e) {
  if (e.which === 13) {
    $(this).blur();
  }
});
$(document).on('blur', '.js-todo_list-editForm', function () {
  const $this = $(this);
  const todoText = $this.siblings('.js-todo_list-text').text();

  if (!$this.val()) {
    $this.val(todoText);
  }

  $this
    .hide()
    .siblings('.js-todo_list-text')
    .text($this.val())
    .show()
    .closest('.js-todo-list_item')
    .attr('data-text', $this.val());
});

// search todos

$('.js-search').on('keyup', function () {
  var searchText = $(this).val();

  $('.js-todo_list-item')
    .show()
    .each(function (i, elm) {
      const text = $(elm).data('text');
      const regexp = new RegExp('^' + searchText);

      if (text && text.match(regexp)) {
        return true;
      }
      $(elm).hide();
    });
});
