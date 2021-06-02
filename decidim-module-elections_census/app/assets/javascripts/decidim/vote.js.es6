$(() => {
  const $form = $("form.new_vote");
  const handleOptionSelected = (event) => {
    const $target = $(event.target);
    const $label = $target.parents("label");
    const $parent = $target.parents(".evote__options");
    const $options = $parent.find(".answer_input.candidate");

    if ($label.attr("aria-disabled") || $label.hasClass("is-disabled")) {
      $target.prop("checked", false);
    }

    const blankChecked = $parent.find(".answer_input.blank").prop("checked") === true;
    const maxOptionsSelected = $parent.find(".answer_input:checked").length === $parent.data("max-selection");

    $options.each((_index, element) => {
      let $element = $(element);
      if (blankChecked || maxOptionsSelected && $element.prop('checked') === false) {
        $element.parents("label").addClass("is-disabled");
        $element.parents("label").attr("aria-disabled", "");
        $element.prop("checked", false);
      } else {
        $element.parents("label").removeClass("is-disabled");
        $element.parents("label").removeAttr("aria-disabled");
      }
    });
  };

  const enoughOptionsSelected = () => {
    const $questions = $form.find(".evote__options");
    const $submit = $form.find(".actions button");
    const $help = $form.find(".actions .help-text");

    let minimumOptionsSelected = $questions.toArray().every((question) => {
      let $question = $(question);
      let optionsSelected = $question.find(".answer_input:checked").length;
      return optionsSelected >= $question.data("min-selection");
    });

    if (minimumOptionsSelected) {
      $submit.removeAttr('disabled');
      $help.hide();
    } else {
      $submit.attr('disabled', 'disabled');
      $help.show();
    }
  }

  $form.find("input[type=checkbox].answer_input").on("change", (event) => {
    handleOptionSelected(event);
  });

  $form.find(".answer_input").on("change", (event) => {
    enoughOptionsSelected();
  });

  enoughOptionsSelected();
})

