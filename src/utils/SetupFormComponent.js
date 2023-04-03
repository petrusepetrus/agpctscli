export default function SetupFormComponent (props, { emit }) {
  /**
   * To Do
   * Need a typescript compliant replacement for this code in
   * conjunction with the correspondin calls in base components
   * BaseCheckbox, BaseInput and BaseTextArea
   * @param event
   */
  const updateValue = (event) => {
    let val = event.target.value

    if (event.target.type === 'checkbox') val = event.target.checked
    if (event.target.type === 'radio') val = props.value

    emit('update:modelValue', val)
  }

  return { updateValue }
}
