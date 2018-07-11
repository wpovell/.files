;; Neotree ;;
(use-package neotree
  :init
  (setq neo-theme (if (display-graphic-p) 'icons 'arrow))
  :config
  (set-window-fringes neo-global--window 1 0)
  :bind (("C-\\" . neotree-toggle)))

;; Dashboard ;;
(use-package dashboard
  :init
  (setq dashboard-startup-banner "~/.emacs.d/imgs/ep2.png")
  (setq dashboard-banner-logo-title "")
  (setq dashboard-items '((recents  . 5)
                          (projects . 5)
                          (agenda . 5)))
  :config
  (dashboard-setup-startup-hook))

;; git-gutter ;;
(use-package git-gutter
  :config
  (global-git-gutter-mode)
  (custom-set-variables
   '(git-gutter:update-interval 2))

  ;; Disable linenum and modeline for dash
  (add-hook 'dashboard-mode-hook (lambda ()
				   (display-line-numbers-mode -1)
				   (setq mode-line-format nil))))

;; Multi cursor ;;
(use-package multiple-cursors
  :bind (("C-q" . mc/mark-next-like-this)))

;; Helm ;;
(use-package helm
  :bind (("M-x" . helm-M-x))
  :config
  (require 'helm-config)
  (helm-mode 1))

;; Projectile ;;
(use-package projectile
  :init
  (setq projectile-enable-caching t))

;; Helm Projectile ;;
(use-package helm-projectile
  :init
  (setq helm-projectile-fuzzy-match nil)

  :config
  (helm-projectile-on))

;; Modes ;;
(use-package fish-mode)
(use-package markdown-mode)
(use-package yaml-mode)

;; Magit ;;
(use-package magit
  :bind (("C-c m s" . magit-status)))

(when window-system
  (use-package org-beautify-theme))

(use-package dracula-theme)
(use-package page-break-lines)
(use-package all-the-icons)
