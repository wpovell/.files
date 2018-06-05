;; Fish some ansi-term newline issues
(setq term-suppress-hard-newline t)

;; Window movement
(global-set-key (kbd "<M-right>") 'windmove-right)
(global-set-key (kbd "<M-left>") 'windmove-left)
(global-set-key (kbd "<M-up>") 'windmove-up)
(global-set-key (kbd "<M-down>") 'windmove-down)

;; Ido
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(ido-mode 1)
(setq ido-use-filename-at-point 'guess)
(setq ido-create-new-buffer 'always)

;; Multi cursor
(require 'multiple-cursors)
(global-set-key (kbd "C-p") `mc/mark-next-like-this-symbol)
(global-set-key (kbd "C-q") 'mc/mark-next-like-this)

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

;; Line numbers
(require 'nlinum)
(global-nlinum-mode t)
(setq nlinum-format " %d  ")

;; Follow symlinks without asking
(setq vc-follow-symlinks t )

;; Hide the startup message
(setq inhibit-startup-message t
      inhibit-startup-screen t )

(defun display-startup-echo-area-message () (message ""))
;;(put 'inhibit-startup-echo-area-message 'saved-value t)
;;(setq inhibit-startup-echo-area-message (user-login-name))

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

;; Easier ffap
(global-set-key (kbd "C-x C-f") 'find-file-at-point)

(load-theme 'dracula)
(global-git-gutter-mode +1)

;; Kill buffer unless modified
(defun volatile-kill-buffer ()
   (interactive)
   (let ((buffer-modified-p nil))
     (kill-buffer (current-buffer))))

(global-set-key (kbd "C-f") 'toggle-frame-fullscreen)
(global-set-key (kbd "C-x k") 'volatile-kill-buffer)
(global-set-key (kbd "<C-return>") '(lambda () (interactive) (ansi-term "/bin/bash")))

;; Close term buffer on exit
(defadvice term-handle-exit
  (after term-kill-buffer-on-exit activate)
(kill-buffer))
