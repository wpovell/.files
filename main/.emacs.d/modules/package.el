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

;; Guru mode ;;
;; Prevent from using traditional navigation keys
(use-package guru-mode
  :config
  (guru-global-mode +1))

;; Page break lines ;;
(use-package page-break-lines
  :config
  (global-page-break-lines-mode))

(defun isgui () "Returns t if in a GUI mode"
       (or
        (window-system)
        (string= (daemonp) "gui")))

;; Dashboard ;;
(if
    (isgui)
    (use-package dashboard
      :init
      (setq initial-buffer-choice (lambda () (get-buffer "*dashboard*")))
      (setq dashboard-startup-banner 1)
      (setq dashboard-banner-logo-title "Emacs")
      (setq dashboard-items '((recents  . 5)
                              (projects . 5)
                              (agenda   . 5)))

      :config
      (dashboard-setup-startup-hook)
      ;; Disable linenum and modeline for dash
      (add-hook 'dashboard-mode-hook
                (lambda ()
	          (display-line-numbers-mode -1)))))

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

;; Magit ;;
(use-package magit
  :bind (("C-c m s" . magit-status)))

;; Ivy ;;
(use-package ivy
  :bind
  :config
  (ivy-mode t))

(use-package swiper
  :bind (("C-s" . swiper)))

(use-package counsel
  :bind (("C-x C-f" . counsel-find-file)
         ("M-x" . counsel-M-x)))

;; Projectile ;;
(use-package projectile
  :init
  (setq projectile-enable-caching t)
  (setq projectile-completion-system 'ivy))

;; Modes ;;
(use-package fish-mode)
(use-package markdown-mode
  :config
  (add-hook 'markdown-mode-hook
            (lambda ()
              (flyspell-mode))))
(use-package yaml-mode)

;; Theme ;;
(if (isgui)
    (use-package atom-one-dark-theme))
