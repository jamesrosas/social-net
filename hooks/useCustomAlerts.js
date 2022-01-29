import Swal from 'sweetalert2'

const useCustomAlerts = () => {

    const singleAlertMessage = Swal.mixin({
        showConfirmButton: true,
        confirmButtonText: 'OK',
        customClass: {
          container: 'alert-container',
          confirmButton: 'btn-class',
          content: 'content-class',
          popup: 'popup-class',
          htmlContainer: 'letra-style'
        },
        buttonsStyling: false,
        backdrop:`rgba(0,0,123,0.4)`,
        showClass:{
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        },
        hideClass:{
          popup: 'swal2-hide',
          backdrop: 'swal2-backdrop-hide',
          icon: 'swal2-icon-hide'
        },
      })

    const optionsAlertMessage = Swal.mixin({
        showConfirmButton: true,
        showCancelButton: true,
        // reverseButtons: true,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          container: 'alert-container',
          confirmButton: 'btn-class',
          cancelButton: 'btn-cancel',
          content: 'content-class',
          popup: 'popup-class',
          htmlContainer: 'letra-style'
        },
        buttonsStyling: false,
        backdrop:`rgba(0,0,123,0.4)`,
        showClass:{
          popup: 'swal2-show',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        },
        hideClass:{
          popup: 'swal2-hide',
          backdrop: 'swal2-backdrop-hide',
          icon: 'swal2-icon-hide'
        },
      })

    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
            popup: 'popup-toast',
            htmlContainer: 'letra-popup',
            icon: 'icon-toast'
          }  
    })
    
    return {
        singleAlertMessage,
        optionsAlertMessage,
        toast
    }
}

export default useCustomAlerts