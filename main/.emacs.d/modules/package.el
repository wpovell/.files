;;; Package setup
(require 'package)

(setq package-enable-at-startup nil)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/"))
(add-to-list 'package-archives '("gnu" . "https://elpa.gnu.org/packages/"))
(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(eval-when-compile
  (require 'use-package))

(setq use-package-always-ensure t)
(setq load-prefer-newer t)
(use-package auto-compile
  :defer nil
  :config (auto-compile-on-load-mode))
;;;;;;

;; Guru mode ;;
;; Prevent from using traditional navigation keys
(use-package guru-mode
  :config
  (guru-global-mode +1))

;; Page break lines ;;
;; (use-package page-break-lines
;;   :config
;;   (global-page-break-lines-mode))

(defun isgui () "Return t if in a GUI mode."
       (or
        (window-system)
        (string= (daemonp) "gui")))

;; Recentf
(use-package recentf
  :custom
  (recentf-max-menu-items 100)
  (recentf-max-saved-items 100)
  :init
  (recentf-mode))

;; Dashboard ;;
(if
    (and (isgui) (> emacs-major-version 25))
    (use-package dashboard
      :init
      (setq initial-buffer-choice (lambda () (get-buffer "*dashboard*")))
      (setq dashboard-startup-banner 4)
      (setq dashboard-banner-logo-title "Emacs")
      (setq dashboard-items '((recents  . 5)
                              (projects . 5)))

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

(if (> emacs-major-version 25)
    (progn
     ;; Magit ;;
     (use-package magit
       :bind (("C-c m s" . magit-status)))
     ;; Projectile ;;
     (use-package projectile
       :bind (("C-c p" . projectile-command-map))
       :init
       (setq projectile-enable-caching t)
       (setq projectile-completion-system 'ivy))
     ))

;; Ivy ;;
(use-package ivy
 :config
 (ivy-mode t)
 (setq ivy-use-virtual-buffers t)
 :bind (("C-x C-b" . ivy-switch-buffer)))

(use-package counsel
  :config
  (counsel-mode)
  (setq counsel-find-file-at-point t)
  :bind (("C-x C-f" . counsel-find-file)))

(use-package swiper
  :bind ("C-s" . swiper))

;; LSP ;;
(use-package lsp-mode
  :config
  (add-hook 'programming-mode-hook 'lsp))
(use-package lsp-ui
  :config
  (add-hook 'lsp-mode-hook 'lsp-ui-mode))

(use-package flycheck
  :config
  (global-flycheck-mode))

(use-package company
  :init
  (setq company-idle-delay 0.1)
  :config
  (global-company-mode))

(use-package company-lsp
  :after company lsp-mode
  :init
  (push 'company-lsp company-backends))

;; Neotree ;;
(use-package treemacs
  :bind (("C-\\" . treemacs))
)

;; Modes ;;
(use-package fish-mode)
(use-package markdown-mode
  :config
  (add-hook 'markdown-mode-hook
            (lambda ()
              (flyspell-mode))))
(use-package yaml-mode)
(use-package rust-mode)
(use-package lsp-rust
  :init
  (setq lsp-rust-rls-command '("rustup" "run" "nightly" "rls"))
  (add-hook 'rust-mode-hook #'lsp-rust-enable)
  (add-hook 'rust-mode-hook #'flycheck-mode))

;; Theme ;;
(if (isgui)
    (use-package atom-one-dark-theme))
