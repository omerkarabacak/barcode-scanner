var notification = document.querySelector('#toast-notification');

//To send toast notification
function sendToastNotification(msg, timer, actionText, actionHandler) {
	var data = {
		message: msg || '',
		timeout: timer || 3000
	};
	if (actionText && actionHandler) {
		data.actionHandler =  actionHandler;
		data.actionText =  'open';
	}

	if (notification && notification.MaterialSnackbar) {
		notification.MaterialSnackbar.showSnackbar(data);
	}
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../sw.js', { scope: '/' }).then(function(reg) {
		if (reg.installing) {
			console.log('Service worker installing');
			sendToastNotification('App is ready for offline use', 4000);
		} else if(reg.waiting) {
			console.log('Service worker installed');
		} else if(reg.active) {
			console.log('Service worker active');
		}
	}).catch(function(error) {
		console.log('Registration failed with ' + error); // Registration failed
	});
}
