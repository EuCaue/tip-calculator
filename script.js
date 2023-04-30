const $inputBill = document.querySelector("#bill");
const $inputTipCustom = document.querySelector("#custom");
const $inputPeople = document.querySelector("#people");
const $btnReset = document.querySelector(".btn-reset");
const [$tipAmount, $total] = document.querySelectorAll(".amount > p");
const $forms = document.querySelectorAll("form");
const [$errorBill, $errorTip, $errorPeople] =
  document.querySelectorAll(".error");
let tipPercentage = "";

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const submit = () => {
  if (
    $inputBill.value == "" ||
    $inputPeople.value == "" ||
    (tipPercentage || $inputTipCustom.value) == ""
  ) {
    return;
  }
  const resultTipAmount =
    (Number($inputBill.value) / Number($inputPeople.value)) *
    (Number(tipPercentage || $inputTipCustom.value) / 100);
  const resultTotalBill =
    Number($inputBill.value) / Number($inputPeople.value) + resultTipAmount;

  $tipAmount.textContent = formatCurrency.format(
    Math.floor(resultTipAmount * 100) / 100
  );
  $total.textContent = formatCurrency.format(resultTotalBill);
};

const verifyInput = ($input, $errorElement) => {
  if ($input.validity.valid && Number($input.value) > 0) {
    $errorElement.style.display = "none";
    return false;
  } else {
    $errorElement.style.display = "flex";
    $errorElement.innerText = "Can't be zero or letters";
    return true;
  }
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("tip-value")) {
    $inputTipCustom.value = "";
    $errorTip.style.display = "none";
    tipPercentage = Number(e.target.innerText.replace("%", ""));
    submit();
  }
});

$inputBill.addEventListener("keyup", () => {
  verifyInput($inputBill, $errorBill);
  submit();
});

$inputTipCustom.addEventListener("keyup", () => {
  verifyInput($inputTipCustom, $errorTip);
  submit();
});

$inputPeople.addEventListener("keyup", () => {
  verifyInput($inputPeople, $errorPeople);
  submit();
});

$forms.forEach(($element) => {
  $element.addEventListener("submit", (e) => e.preventDefault());
});

$btnReset.addEventListener("click", () => {
  $forms.forEach(($element) => {
    $element.reset();
  });
  $tipAmount.textContent = formatCurrency.format(0);
  $total.textContent = formatCurrency.format(0);
  $inputTipCustom.value = "";
  tipPercentage = "";
  $errorTip.style.display = "none";
  $errorPeople.style.display = "none";
  $errorBill.style.display = "none";
});
