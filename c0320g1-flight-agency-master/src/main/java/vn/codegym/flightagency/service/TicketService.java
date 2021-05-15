package vn.codegym.flightagency.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.flightagency.model.Ticket;

public interface TicketService {
        Page<Ticket> findAllByName(String search, Pageable pageable);
        Page<Ticket> findAllByFlight(String search, Pageable pageable);
        Page<Ticket> findAllByBookingCode(String search, Pageable pageable);
        void save(Ticket ticket);
        void deleteById(Long id);
        Ticket findById(Long id);

}
