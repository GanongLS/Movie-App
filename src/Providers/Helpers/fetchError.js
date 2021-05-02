const fetchError = (err, name) => {
  console.log({'Error pada': name});
  var errmessage = err.message;
  //Head untuk check code error
  // console.log({'error.stack': err.stack});
  console.log('err.code', err.code);
  // console.log('err.message', err.message);
  // console.log('err.response', err.response);
  // console.log('errr.response.status', err.response.status);
  // console.log('err', err);
  // console.log('errtype', typeof err);
  console.log(`error ${name}`, {'error message': errmessage});
  console.log({'object error': err});
  if (err.code == 'ECONNABORTED') {
    errmessage = 'Request Timeout';
  } else if (err.message == 'Network Error') {
    errmessage = 'Terjadi gangguan sambungan.';
  } else if (err.hasOwnProperty('response')) {
    console.log('there is response');
    if (err.response === undefined) {
      errmessage =
        'Server sedang mengalami gangguan. Silakan coba beberapa saat lagi';
    } else if (err.message === 'Request failed with status code 500') {
      errmessage = 'Internal Server Error, silakan coba beberapa saat lagi';
    } else {
      errmessage = err.response.data.response_msg;
    }
  } else if (err.message == '') {
    errmessage = 'Data Response Tidak valid.';
  }
  return errmessage;
};

export {fetchError};
