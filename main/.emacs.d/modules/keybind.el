;; Window management
(global-set-key (kbd "M-l") 'windmove-right)
(global-set-key (kbd "M-h") 'windmove-left)
(global-set-key (kbd "M-k") 'windmove-up)
(global-set-key (kbd "M-j") 'windmove-down)

(global-set-key (kbd "M-o") 'other-window)

;; Switch focus on split
(global-set-key (kbd "C-x /") (lambda ()
                                (interactive)
                                (split-window-vertically)
                                (other-window 1)))

(global-set-key (kbd "C-x \\") (lambda ()
                                 (interactive)
                                 (split-window-horizontally)
                                 (other-window 1)))

;; Kill buffer unless modified
(defun volatile-kill-buffer ()
   (interactive)
   (let ((buffer-modified-p nil))
     (kill-buffer (current-buffer))))
(global-set-key (kbd "C-x k") 'volatile-kill-buffer)

;; Fullscreen
(global-set-key (kbd "s-f") 'toggle-frame-fullscreen)

;; Term
(global-set-key (kbd "<C-return>") '(lambda () (interactive) (ansi-term "/bin/bash")))

(global-set-key (kbd "C-+") 'text-scale-increase)
(global-set-key (kbd "C--") 'text-scale-decrease)

;; Goto line
(global-set-key (kbd "M-g") 'goto-line)
