import { Component , OnInit } from '@angular/core';
import {ChatService} from '../../userservice/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}
@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
 
  messages: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;
  isChatVisible: boolean = false;
  now: Date = new Date();

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      // Initial bot greeting if no history
      this.messages.push({
        text: 'Hello! How can I assist you today?',
        isUser: false,
        timestamp: new Date()
      });
      this.saveMessages();
    }
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.isLoading) return;

    // Add user message
    const userMessage: Message = {
      text: this.newMessage,
      isUser: true,
      timestamp: new Date()
    };
    this.messages.push(userMessage);
    this.saveMessages();

    const messageToSend = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    // Send to backend
    this.chatService.sendMessage(messageToSend).subscribe({
      next: (response) => {
        const botMessage: Message = {
          text: response.reply,
          isUser: false,
          timestamp: new Date()
        };
        this.messages.push(botMessage);
        this.saveMessages();
        this.isLoading = false;
      },
      error: (error) => {
        let errorText = 'Sorry, something went wrong. Try again later.';
        if (error.status === 503) {
          errorText = 'The chatbot is currently overloaded. Please try again later.';
        } else if (error.status === 400) {
          errorText = 'Please enter a valid message.';
        }
        const errorMessage: Message = {
          text: errorText,
          isUser: false,
          timestamp: new Date()
        };
        this.messages.push(errorMessage);
        this.saveMessages();
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.isLoading) {
      this.sendMessage();
    }
  }

  private saveMessages() {
    localStorage.setItem('chatHistory', JSON.stringify(this.messages));
  }

  clearChat() {
    this.messages = [
      {
        text: 'Hello! How can I assist you today?',
        isUser: false,
        timestamp: new Date()
      }
    ];
    this.saveMessages();
  }
}
