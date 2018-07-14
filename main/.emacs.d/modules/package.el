
;; Package setup
(require 'package)
(setq package-enable-at-startup nil)
(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/"))
(add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/"))
(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(eval-when-compile
  (require 'use-package))

(setq use-package-always-ensure t)
;;;;;;

;; Diminish to hide modes
(require 'whitespace)
(use-package diminish
  :config
  (diminish 'whitespace-mode)
  (diminish 'eldoc-mode))

;; Guru mode ;;
;; Prevent from using traditional navigation keys
(use-package guru-mode
  :diminish guru-mode
  :config
  (guru-global-mode +1))

;; Page break lines ;;
(use-package page-break-lines
  :diminish page-break-lines-mode
  :config
  (global-page-break-lines-mode))

;; Dashboard ;;
(use-package dashboard
  :init
  (setq dashboard-startup-banner "~/.emacs.d/imgs/ep2.png")
  (setq dashboard-banner-logo-title "")
  (setq dashboard-items '((recents  . 5)
                          (projects . 5)))

  :config
  (dashboard-setup-startup-hook)
  ;; Disable linenum and modeline for dash
  (add-hook 'dashboard-mode-hook
            (lambda ()
	      (display-line-numbers-mode -1))))

;; git-gutter ;;
(use-package git-gutter
  :diminish git-gutter-mode
  :config
  (global-git-gutter-mode)
  (custom-set-variables
   '(git-gutter:update-interval 2)))

;; Multi cursor ;;
(use-package multiple-cursors
  :bind (("C-q" . mc/mark-next-like-this)))

;; Projectile ;;
(use-package projectile
  :init
  (setq projectile-enable-caching t))

;; Magit ;;
(use-package magit
  :bind (("C-c m s" . magit-status)))

;; Modes ;;
(use-package fish-mode)
(use-package markdown-mode)
(use-package yaml-mode)

;; Theme ;;
(use-package atom-one-dark-theme)
