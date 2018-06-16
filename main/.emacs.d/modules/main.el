;; Enable mouse in term emacs
(xterm-mouse-mode 1)

;; Keep buffers consistent with disk
(global-auto-revert-mode t)

;; Org mode
(setf org-agenda-files '("~/org"))

;; Fish some ansi-term newline issues
(setq term-suppress-hard-newline t)

;; Use spaces
(setq-default indent-tabs-mode nil)

;; Ido
(ido-mode 1)
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(setq ido-use-filename-at-point 'guess)
(setq ido-create-new-buffer 'always)

;; Start in fullscreen
(set-frame-parameter nil 'fullscreen 'fullboth)

;; Don't put tilda files everywhere
(setq backup-directory-alist `(("." . "~/.emacs.d/backups")) )

;; Hightlight marked region
(transient-mark-mode t)

;; Hide gui GUI
(menu-bar-mode -1)
(tool-bar-mode -1)
(scroll-bar-mode -1)

;; Make divider prettier
(set-face-background 'vertical-border "gray")
(set-face-foreground 'vertical-border (face-background 'vertical-border))

;; Follow symlinks without asking
(setq vc-follow-symlinks t )

;; Hide the startup message
(setq inhibit-startup-message t
      inhibit-startup-screen t )

(defun display-startup-echo-area-message () (message ""))

;; No bell
(setq ring-bell-function 'ignore )

;; UTF-8 Default
(setq coding-system-for-read 'utf-8 )
(setq coding-system-for-write 'utf-8 )

;; Wrap text
(setq default-fill-column 80)

;; Highlight parens
(show-paren-mode 1)

;; Show column in modeline
(setq column-number-mode t)

;; Theme
(load-theme 'dracula)

;; Close term buffer on exit
(defadvice term-handle-exit
  (after term-kill-buffer-on-exit activate)
  (kill-buffer))

;; Line numbers
(global-display-line-numbers-mode)
