<script>
export default {
  data() {
    return {
      showEventForm: false,
      editingEvent: false,
      events: [
        {
          id: 1,
          title: 'Vue Workshop for Beginners',
          description: 'Hands-on workshop covering Vue fundamentals',
          startDate: '2023-07-15T10:00',
          endDate: '2023-07-15T14:00',
          location: 'Zoom',
          maxAttendees: 50,
          eventType: 'Workshop',
          registrationLink: 'https://example.com/register/vue-workshop',
          attendees: ['user1', 'user2', 'user3'],
        },
        {
          id: 2,
          title: 'Advanced Vue Patterns Webinar',
          description: 'Learn advanced techniques from Vue experts',
          startDate: '2023-08-05T18:00',
          endDate: '2023-08-05T20:00',
          location: 'Google Meet',
          maxAttendees: 100,
          eventType: 'Webinar',
          registrationLink: 'https://example.com/register/vue-webinar',
          attendees: ['user4', 'user5'],
        },
      ],
      newEvent: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        maxAttendees: null,
        eventType: 'Workshop',
        registrationLink: '',
      },
    };
  },
  computed: {
    sortedEvents() {
      return [...this.events].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    },
  },
  methods: {
    toggleEventForm() {
      this.showEventForm = !this.showEventForm;
      if (!this.showEventForm) {
        this.editingEvent = false;
        this.resetEventForm();
      }
    },
    addEvent() {
      if (
        !this.newEvent.title ||
        !this.newEvent.description ||
        !this.newEvent.startDate ||
        !this.newEvent.endDate ||
        !this.newEvent.location
      ) {
        this.$toast.error('Please fill all required fields');
        return;
      }
      if (new Date(this.newEvent.startDate) >= new Date(this.newEvent.endDate)) {
        this.$toast.error('End date must be after start date');
        return;
      }
      const newEvent = {
        id: this.events.length + 1,
        ...this.newEvent,
        attendees: [],
      };
      this.events.push(newEvent);
      this.$toast.success('Event created successfully');
      this.resetEventForm();
      this.showEventForm = false;
    },
    editEvent(event) {
      this.newEvent = {
        ...event,
        startDate: event.startDate.replace(' ', 'T').substring(0, 16),
        endDate: event.endDate.replace(' ', 'T').substring(0, 16),
      };
      this.editingEvent = true;
      this.showEventForm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    updateEvent() {
      const index = this.events.findIndex((e) => e.id === this.newEvent.id);
      if (index !== -1) {
        this.events.splice(index, 1, {
          ...this.newEvent,
          startDate: this.newEvent.startDate.replace('T', ' '),
          endDate: this.newEvent.endDate.replace('T', ' '),
        });
        this.$toast.success('Event updated successfully');
        this.resetEventForm();
        this.showEventForm = false;
        this.editingEvent = false;
      }
    },
    resetEventForm() {
      this.newEvent = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        maxAttendees: null,
        eventType: 'Workshop',
        registrationLink: '',
      };
    },
    openRegistration(url) {
      window.open(url, '_blank');
    },
    deleteItem(type, id) {
      if (type === 'event') {
        this.events = this.events.filter((e) => e.id !== id);
        this.$toast.success('Event deleted successfully');
      }
    },
    truncateDescription(text, length = 100) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    formatDay(dateString) {
      return new Date(dateString).getDate();
    },
    formatMonth(dateString) {
      return new Date(dateString).toLocaleString('default', { month: 'short' });
    },
    formatTimeRange(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${startTime} - ${endTime}`;
    },
    isUpcoming(event) {
      return new Date(event.startDate) > new Date();
    },
    isPast(event) {
      return new Date(event.endDate) < new Date();
    },
  },
};
</script>

<template>
  <section class="tab-content">
    <div class="page-header">
      <div>
        <h1>Manage Events</h1>
        <p class="subtitle">Organize workshops and webinars</p>
      </div>
  <button @click="toggleEventForm" class="btn-primary add-event-btn">
  <i class="fas" :class="showEventForm ? 'fa-times' : 'fa-plus'"></i>
  <span>{{ showEventForm ? 'Cancel' : 'Add New Event' }}</span>
</button>
    </div>

    <!-- Event Form -->
    <transition name="fade">
      <div v-if="showEventForm" class="form-container card">
        <h3>{{ editingEvent ? 'Edit Event' : 'Add New Event' }}</h3>
        <div class="form-group">
          <label>Title <span class="required">*</span></label>
          <input v-model="newEvent.title" type="text" placeholder="Event title" required />
        </div>
        <div class="form-group">
          <label>Description <span class="required">*</span></label>
          <textarea v-model="newEvent.description" rows="4" placeholder="Event description" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Start Date & Time <span class="required">*</span></label>
            <input v-model="newEvent.startDate" type="datetime-local" required />
          </div>
          <div class="form-group">
            <label>End Date & Time <span class="required">*</span></label>
            <input v-model="newEvent.endDate" type="datetime-local" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Location/Platform <span class="required">*</span></label>
            <input v-model="newEvent.location" type="text" placeholder="Zoom, Google Meet, etc." required />
          </div>
          <div class="form-group">
            <label>Max Attendees</label>
            <input v-model.number="newEvent.maxAttendees" type="number" min="1" />
          </div>
        </div>
        <div class="form-group">
          <label>Event Type</label>
          <select v-model="newEvent.eventType" class="custom-select">
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Conference">Conference</option>
            <option value="Q&A Session">Q&A Session</option>
          </select>
        </div>
        <div class="form-group">
          <label>Registration Link</label>
          <input v-model="newEvent.registrationLink" type="url" placeholder="https://example.com/register" />
        </div>
        <div class="form-actions">
          <button @click="resetEventForm" type="button" class="btn-secondary">
            <i class="fas fa-undo"></i> Reset
          </button>
          <button @click="editingEvent ? updateEvent() : addEvent()" type="button" class="btn-primary">
            <i :class="editingEvent ? 'fas fa-save' : 'fas fa-plus'"></i>
            {{ editingEvent ? 'Update Event' : 'Create Event' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Events List -->
    <div class="list-container">
      <div v-if="events.length === 0 && !showEventForm" class="empty-state card">
        <i class="fas fa-calendar-alt"></i>
        <p>No events scheduled yet</p>
        <button @click="toggleEventForm" class="btn-primary">Schedule Your First Event</button>
      </div>

      <div v-else class="event-list">
        <div v-for="event in sortedEvents" :key="event.id" class="card event-card" :class="{ 'upcoming-event': isUpcoming(event), 'past-event': isPast(event) }">
          <div class="event-date">
            <div class="event-day">{{ formatDay(event.startDate) }}</div>
            <div class="event-month">{{ formatMonth(event.startDate) }}</div>
          </div>
          <div class="event-details">
            <div class="event-header">
              <h3>{{ event.title }}</h3>
              <span class="event-type">{{ event.eventType }}</span>
            </div>
            <div class="event-meta">
              <span class="event-time">
                <i class="far fa-clock"></i> {{ formatTimeRange(event.startDate, event.endDate) }}
              </span>
              <span class="event-location">
                <i class="fas fa-map-marker-alt"></i> {{ event.location }}
              </span>
            </div>
            <p class="event-description">{{ truncateDescription(event.description) }}</p>
            <div class="event-footer">
              <div class="event-attendees">
                <span class="attendees-count">
                  <i class="fas fa-users"></i>
                  {{ event.attendees ? event.attendees.length : 0 }} /
                  {{ event.maxAttendees || '∞' }} registered
                </span>
                <span v-if="isUpcoming(event)" class="event-status upcoming">Upcoming</span>
                <span v-else-if="isPast(event)" class="event-status past">Completed</span>
                <span v-else class="event-status ongoing">Ongoing</span>
              </div>
              <div class="event-actions">
                <button @click="editEvent(event)" class="btn-icon" aria-label="Edit event">
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="$emit('confirm-delete', 'event', event.id)"
                  class="btn-icon danger"
                  aria-label="Delete event"
                >
                  <i class="fas fa-trash"></i>
                </button>
                <button
                  v-if="event.registrationLink"
                  @click="openRegistration(event.registrationLink)"
                  class="btn-icon success"
                  aria-label="View registration"
                >
                  <i class="fas fa-external-link-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>

.add-event-btn {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
}

.btn-primary:not(.add-event-btn) {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.event-card {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.event-date {
  width: 80px;
  min-height: 80px;
  background: #3498db;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.event-day {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.event-month {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-details {
  padding: 1.25rem;
  flex-grow: 1;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.event-header h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-right: 0.5rem;
}

.event-type {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 0.75rem;
}

.event-description {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.event-attendees {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
}

.event-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
}

.event-status.upcoming {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.event-status.ongoing {
  background: rgba(241, 196, 15, 0.1);
  color: #f39c12;
}

.event-status.past {
  background: rgba(189, 195, 199, 0.2);
  color: #7f8c8d;
}

.upcoming-event {
  border-left: 4px solid #2ecc71;
}

.past-event {
  opacity: 0.8;
}
</style>