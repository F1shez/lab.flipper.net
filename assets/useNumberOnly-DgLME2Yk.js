function useNumbersOnly(evt) {
  const char = evt.key;
  if (!/^\d$/.test(char) && char !== ".") {
    evt.preventDefault();
  }
}
export {
  useNumbersOnly as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlTnVtYmVyT25seS1EZ0xNRTJZay5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9saWIvdXRpbHMvdXNlTnVtYmVyT25seS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdXNlTnVtYmVyc09ubHkoZXZ0OiBLZXlib2FyZEV2ZW50KSB7XG4gIGNvbnN0IGNoYXIgPSBldnQua2V5O1xuXG4gIGlmICghL15cXGQkLy50ZXN0KGNoYXIpICYmIGNoYXIgIT09ICcuJykge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQU8sU0FBUyxlQUFlLEtBQW9CO0FBQ2pELFFBQU0sT0FBTyxJQUFJO0FBRWpCLE1BQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxLQUFLLFNBQVMsS0FBSztBQUN0QyxRQUFJLGVBQUE7QUFBQSxFQUNOO0FBQ0Y7In0=
