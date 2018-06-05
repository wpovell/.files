;; Neotree ;;
(require 'neotree)

(global-set-key (kbd "C-\\") 'neotree-toggle)
(setq neo-theme (if (display-graphic-p) 'icons 'arrow))
(set-window-fringes neo-global--window 1 0)


;; Dashboard ;;
(require 'dashboard)
(dashboard-setup-startup-hook)

(setq dashboard-startup-banner "~/.emacs.d/imgs/ep2.png")
(setq dashboard-banner-logo-title "")
(setq dashboard-items '((recents  . 5)
                        (agenda . 5)))

;; git-gutter & linum
(global-git-gutter-mode)
(custom-set-variables
 '(git-gutter:update-interval 2))

;; Disable linenum and modeline for dash
(add-hook 'dashboard-mode-hook (lambda ()
				 (display-line-numbers-mode -1)
				 (setq mode-line-format nil)))

;; Multi cursor ;;
(require 'multiple-cursors)

(global-set-key (kbd "C-p") `mc/mark-next-like-this-symbol)
(global-set-key (kbd "C-q") 'mc/mark-next-like-this)
