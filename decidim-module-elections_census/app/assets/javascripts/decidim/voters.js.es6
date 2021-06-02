$(() => {
  const $form = $("form.new_voter");
  const $legalGuardianFields = $form.find(".legal-guardian-fields");
  const $familyBook = $form.find(".family-book");
  const needsLegalGuardian = () => {
    let birthday_day = parseInt($("#voter_birthday_3i").val());
    let birthday_month = parseInt($("#voter_birthday_2i").val()) - 1;
    let birthday_year = parseInt($("#voter_birthday_1i").val());

    if (birthday_day > 0 && birthday_month >= 0 && birthday_year > 0) {
      let birthday = new Date(birthday_year, birthday_month, birthday_day).getTime();
      let threshold = new Date(2021, 5, 18).getTime();
      let difference = Math.round((threshold - birthday)/(1000*60*60*24*365));

      if (difference < 16) {
        $legalGuardianFields.show();
        $familyBook.show();
      } else {
        $legalGuardianFields.hide();
        $familyBook.hide();
      }
    } else {
      $legalGuardianFields.hide();
      $familyBook.hide();
    }
  }

  needsLegalGuardian();
  $form.find(".voter-birthday select").on("change", () => {
    needsLegalGuardian();
  });
})
