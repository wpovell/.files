(require 'dashboard)
(dashboard-setup-startup-hook)
(setq mode-line-format nil)
(setq dashboard-startup-banner "~/.emacs.d/imgs/ep2.png")
(setq dashboard-banner-logo-title "")
(setq dashboard-items '((recents  . 5)
                        (agenda . 5)))
(image-type-available-p 'png)
(add-hook 'dashboard-mode-hook (lambda ()
				 (nlinum-mode -1)
				 (setq mode-line-format nil)))

;; Had this before as a way to get dashboard to show up when running emacsclient
;;(setq initial-buffer-choice (lambda () (get-buffer "*dashboard*") (message "")))
